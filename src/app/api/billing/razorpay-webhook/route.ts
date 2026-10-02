import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyRazorpayWebhookSignature } from "@/lib/billing/razorpay";

// Lazy admin client
let _adminClient: any = null;
function getAdminClient() {
  if (!_adminClient) {
    _adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _adminClient;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "rzp_webhook_secret_placeholder";

    // In production, verify the HMAC signature
    if (process.env.NODE_ENV === "production") {
      const isValid = verifyRazorpayWebhookSignature(rawBody, signature, secret);
      if (!isValid) {
        console.warn("[Razorpay Webhook] Invalid webhook signature rejected");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const subscriptionEntity = payload.payload?.subscription?.entity;
    const paymentEntity = payload.payload?.payment?.entity;

    const supabaseAdmin = getAdminClient();

    console.log(`[Razorpay Webhook] Event received: ${event}`, {
      subscriptionId: subscriptionEntity?.id,
      paymentId: paymentEntity?.id,
      amount: paymentEntity?.amount,
    });

    if (event === "subscription.authenticated") {
      // Mandate approved (e.g. ₹99 trial initiated)
      const subId = subscriptionEntity?.id;

      if (subId) {
        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "authenticated",
            trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            current_period_start: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_subscription_id", subId);
      }
    } else if (event === "subscription.charged") {
      // Recurring monthly charge succeeded (₹1,499 or ₹2,999)
      const subId = subscriptionEntity?.id;
      if (subId) {
        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "active",
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_subscription_id", subId);
      }
    } else if (event === "subscription.halted" || event === "subscription.cancelled") {
      // Payment failed / canceled -> grace period
      const subId = subscriptionEntity?.id;
      if (subId) {
        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "halted",
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_subscription_id", subId);
      }
    }

    return NextResponse.json({ received: true, event });
  } catch (error) {
    console.error("[Razorpay Webhook] Processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
