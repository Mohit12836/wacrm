import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { VISMART_BILLING_TIERS } from "@/lib/billing/razorpay";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await req.json().catch(() => ({}));
    const { planTier = "trial", phone, customerName } = body;

    // Razorpay Key configuration from env
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";

    // For the ₹99 Trial AutoPay plan
    const tierConfig = VISMART_BILLING_TIERS[planTier as keyof typeof VISMART_BILLING_TIERS] || VISMART_BILLING_TIERS.trial;

    const mockSubscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    return NextResponse.json({
      success: true,
      subscriptionId: mockSubscriptionId,
      keyId,
      tier: tierConfig,
      customerDetails: {
        phone: phone || user?.phone || "",
        name: customerName || user?.user_metadata?.full_name || "Business Owner",
      },
      checkoutOptions: {
        key: keyId,
        subscription_id: mockSubscriptionId,
        name: "Vismart AI Suite",
        description: "7-Day AI Salesman Trial (₹99)",
        amount: 9900,
        currency: "INR",
        prefill: {
          contact: phone || "",
          name: customerName || "",
        },
        theme: {
          color: "#25D366",
        },
      },
    });
  } catch (error) {
    console.error("[Billing Initiate] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initiate subscription" },
      { status: 500 }
    );
  }
}
