import crypto from "crypto";

export interface CreateSubscriptionOptions {
  planId: string;
  totalCount?: number;
  quantity?: number;
  customerNotify?: boolean;
  notes?: Record<string, string>;
}

export interface RazorpayPlan {
  id: string;
  period: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  item: {
    name: string;
    amount: number; // in paise
    currency: "INR";
    description?: string;
  };
}

/**
 * Verifies Razorpay Webhook signature using HMAC SHA-256
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!rawBody || !signature || !secret) return false;
  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf8"),
      Buffer.from(signature, "utf8")
    );
  } catch (error) {
    console.error("[Razorpay] Signature verification error:", error);
    return false;
  }
}

/**
 * Standard Vismart SaaS Pricing Tiers
 */
export const VISMART_BILLING_TIERS = {
  trial: {
    slug: "trial",
    name: "7-Day VIP Trial (UPI AutoPay)",
    initialAmountPaise: 9900, // ₹99
    recurringAmountPaise: 149900, // ₹1,499/month
    durationDays: 7,
    features: [
      "24/7 AI Sales Closer Agent",
      "Smart Appointment Booking",
      "Dynamic WhatsApp UPI Payment Links",
      "Daily AI WhatsApp Interviewer",
      "Up to 1,000 WhatsApp Conversations",
    ],
  },
  starter: {
    slug: "starter",
    name: "Starter Business Plan",
    monthlyAmountPaise: 149900, // ₹1,499
    features: [
      "Official Meta WhatsApp API Connection",
      "2 Team Staff Logins",
      "Meta Template Broadcasts",
      "Basic AI FAQ & Auto-reply",
    ],
  },
  pro_growth: {
    slug: "pro_growth",
    name: "AI Growth Pro (Best Seller)",
    monthlyAmountPaise: 299900, // ₹2,999
    features: [
      "All Starter Features",
      "Full Autonomous AI Closer & Recovery Agent",
      "WhatsApp Voice Note AI Transcriber",
      "Dynamic Customer Persona Graph",
      "5 Team Staff Logins",
    ],
  },
  vip_agency: {
    slug: "vip_agency",
    name: "Done-For-You VIP Agency",
    setupFeePaise: 999900, // ₹9,999
    monthlyAmountPaise: 349900, // ₹3,499
    features: [
      "Full Setup & Meta Green Tick Application",
      "Unlimited AI Knowledge Training",
      "Dedicated Account Manager",
      "1-Line Website Live Chat Widget Embed",
    ],
  },
} as const;
