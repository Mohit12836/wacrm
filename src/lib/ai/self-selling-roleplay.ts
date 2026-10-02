export interface RoleplayState {
  step: "AWAITING_NICHE" | "LIVE_ROLEPLAY" | "PITCH_CLOSING" | "PAYMENT_LINK";
  niche?: string;
  leadPhone: string;
}

export const NICHE_ROLEPLAY_PRESETS: Record<string, { title: string; greeting: string; sampleResponse: string }> = {
  solar: {
    title: "Solar Rooftop Expert",
    greeting: "नमस्ते सर! ☀️ हमारी सोलर कंपनी में आपका स्वागत है। 3kW सोलर रूफटॉप प्लांट पर सरकार ₹78,000 की डायरेक्ट सब्सिडी दे रही है।",
    sampleResponse: "सर, आपका हर महीने बिजली का बिल औसतन कितना आता है? मैं अभी आपको सटीक सब्सिडी और बचत का पूरा एस्टीमेट बनाकर देता हूँ।",
  },
  coaching: {
    title: "Academic Counselor",
    greeting: "नमस्ते! 🙏 हमारे कोचिंग इंस्टिट्यूट में आपका स्वागत है। हमारे यहाँ NEET, JEE और Foundation के नए बैचेस शुरू हो रहे हैं।",
    sampleResponse: "क्या आप अपने बच्चे की क्लास और टारगेट एग्जाम बता सकते हैं? मैं तुरंत फीस स्ट्रक्चर और फ्री डेमो क्लास का टाइम टेबल भेजता हूँ।",
  },
  clinic: {
    title: "Clinic & Doctor Assistant",
    greeting: "नमस्ते जी! 🩺 हमारे डेंटल & हेल्थ क्लिनिक में आपका स्वागत है। डॉक्टर साहब से परामर्श के लिए आप सही जगह आए हैं।",
    sampleResponse: "आपको किस परेशानी के लिए डॉक्टर को दिखाना है (जैसे दांत दर्द, चेकअप या रूट कैनाल)? मैं उपलब्ध टाइम स्लॉट चेक करके बताता हूँ।",
  },
  real_estate: {
    title: "Property & Real Estate Advisor",
    greeting: "नमस्ते सर! 🏠 हमारे प्राइम रियल एस्टेट प्रोजेक्ट्स में आपका स्वागत है। हमारे पास 2BHK, 3BHK फ्लैट्स और विला उपलब्ध हैं।",
    sampleResponse: "आपका पसंदीदा बजट क्या है? मैं आपको तुरंत ब्रोशर, फ्लोर प्लान और फ्री साइट विजिट का टाइम भेजता हूँ।",
  },
  shop: {
    title: "Store & Retail Assistant",
    greeting: "नमस्ते! 🛍️ हमारी दुकान में आपका स्वागत है। हमारे पास सभी लेटेस्ट वैरायटी और आज का स्पेशल डिस्काउंट उपलब्ध है।",
    sampleResponse: "आप क्या खरीदना चाहते हैं? मैं तुरंत फोटो, रेट लिस्ट और आज का स्पेशल डिस्काउंट कूपन भेजता हूँ।",
  },
};

/**
 * Handles incoming messages for the Self-Selling Inbound Demo Flow
 */
export async function handleSelfSellingInboundMessage(
  senderPhone: string,
  messageText: string
): Promise<{ replyText: string; buttons?: string[]; paymentLink?: string } | null> {
  const normalized = (messageText || "").trim().toLowerCase();

  // 1. Initial Hook
  if (normalized === "hi" || normalized === "hello" || normalized === "demo" || normalized === "start") {
    return {
      replyText:
        "नमस्ते! 🙏 मैं Vismart AI हूँ — भारत का पहला 24/7 WhatsApp AI सेल्समैन।\n\nमैं आपकी दुकान या कंपनी के ग्राहकों से खुद बात करके सामान बेचता हूँ, कोटेशन देता हूँ और पेमेंट लेता हूँ।\n\n🔥 **लाइव टेस्ट करें:** मुझे बताइए आपका किस चीज़ का बिज़नेस है?",
      buttons: ["☀️ Solar", "📚 Coaching", "🩺 Clinic", "🏠 Real Estate", "🛍️ Shop"],
    };
  }

  // 2. Niche Selection / Roleplay Simulation
  for (const [key, preset] of Object.entries(NICHE_ROLEPLAY_PRESETS)) {
    if (normalized.includes(key) || normalized.includes(preset.title.toLowerCase()) || normalized.includes(key.replace("_", " "))) {
      return {
        replyText: `*(⚡ ${preset.title} मोड एक्टिव)*\n\n${preset.greeting}\n\n${preset.sampleResponse}\n\n---\n🎁 **कैसा लगा 2 सेकंड में रिस्पॉन्स?**\nऐसे ही यह AI आपकी खुद की दुकान के हर ग्राहक से 24 घंटे बात कर सकता है!\n\nसिर्फ **₹99 में 7-Day VIP Trial** चालू करें:`,
        buttons: ["💳 Activate for ₹99", "🔄 Try Another Demo"],
        paymentLink: `https://vismart.cloud/pay/trial?phone=${encodeURIComponent(senderPhone)}`,
      };
    }
  }

  // 3. Fallback Pitch
  if (normalized.includes("activate") || normalized.includes("99") || normalized.includes("buy") || normalized.includes("payment")) {
    return {
      replyText:
        "🎉 **शानदार फैसला!**\n\nसिर्फ ₹99 में अपने बिजनेस नंबर पर 24/7 AI सेल्समैन चालू करें (7-Day Trial)।\n\n👉 [ 💳 ₹99 UPI AutoPay से एक्टिवेट करें ](https://vismart.cloud/pay/trial)\n\nपेमेंट होते ही आपका AI 2 मिनट में लाइव हो जाएगा!",
      paymentLink: `https://vismart.cloud/pay/trial?phone=${encodeURIComponent(senderPhone)}`,
    };
  }

  return null;
}
