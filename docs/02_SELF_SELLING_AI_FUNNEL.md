# 🚀 SELF-SELLING AI AGENT & JIO-STYLE ₹99 FUNNEL SPECIFICATION

**Version:** 1.0.0  
**Target:** 100% Autonomous Acquisition, Live Roleplay Demo, and UPI AutoPay Onboarding  

---

## 1. Funnel Architecture

```mermaid
flowchart TD
    A["1. Inbound Lead Trigger\n(Prospect sends 'Hi' on WhatsApp)"] --> B["2. Persona Transformation\n(AI asks: 'What is your business?')"]
    B --> C["3. Live Niche Roleplay\n(AI instantly simulates their business)"]
    C --> D["4. The Shock & Awe Pitch\n('Want this on your number?')"]
    D --> E["5. Dynamic ₹99 UPI AutoPay Link\n(7-Day Trial ➡️ ₹1,499/mo Recurring)"]
    E --> F["6. Webhook Receipt & Instant Onboarding\n(AI welcomes owner & begins daily interviews)"]
```

---

## 2. Inbound Interaction Script & State Machine

### State 1: `AWAITING_NICHE`
- **User Action:** Sends *"Hi"* or *"Demo"* to the Master WhatsApp Number.
- **AI Response:**
  > *"नमस्ते! 🙏 मैं भारत का पहला 24/7 AI सेल्स और सपोर्ट कर्मचारी हूँ।  
  > मैं आपकी दुकान या कंपनी के ग्राहकों से खुद बात करके सामान बेचता हूँ, कोटेशन देता हूँ और पेमेंट लेता हूँ।  
  > 
  > 🔥 **लाइव टेस्ट करें:** मुझे बताइए आपका किस चीज़ का बिज़नेस है? (जैसे: कोचिंग, डॉक्टर, सोलर, दुकान, रियल एस्टेट, कपड़े, जिम)"*

---

### State 2: `LIVE_ROLEPLAY`
- **User Action:** Types *"Solar"*, *"Coaching"*, *"Dental Clinic"*, etc.
- **AI Action:** Switches system prompt immediately to the target domain specialist.
- **AI Response (Example: Solar):**
  > *(सोलर एक्सपर्ट मोड एक्टिव ⚡)*  
  > *"नमस्ते सर! हमारी सोलर कंपनी में आपका स्वागत है। ☀️  
  > 3kW सोलर रूफटॉप प्लांट पर सरकार ₹78,000 की डायरेक्ट सब्सिडी दे रही है।  
  > 
  > आपका हर महीने बिजली का बिल औसतन कितना आता है? मैं अभी 2 सेकंड में आपको सब्सिडी और बचत का पूरा एस्टीमेट बनाकर देता हूँ।"*

---

### State 3: `PITCH_CLOSING`
- **User Action:** Reacts to the roleplay or answers the question.
- **AI Response:**
  > *"सर, जैसा मैंने अभी 2 सेकंड में आपकी भाषा में बात करके दिखाई, वैसे ही मैं आपकी खुद की दुकान के हर ग्राहक से 24 घंटे बात करूँगा।  
  > 
  > 🎁 **स्पेशल लॉन्च ऑफर:**  
  > सिर्फ **₹99** में 7 दिन का पूरा VIP ट्रायल एक्टिवेट करें!  
  > (कोई ऐप नहीं, कोई कोडिंग नहीं — सीधे आपके नंबर पर चालू होगा)।  
  > 
  > 👉 [ 💳 ₹99 में एक्टिवेट करें (UPI AutoPay) ](https://vismart.cloud/pay/trial?session=xyz)"*

---

### State 4: `PAYMENT_WEBHOOK_ONBOARDING`
- **Razorpay Event:** `subscription.charged` / `payment.captured` (Amount: ₹9900 paise).
- **System Action:**
  1. Creates Organization profile linked to the payer's mobile number.
  2. Generates a temporary tenant token.
  3. Sends instant WhatsApp Confirmation:
     > *"🎉 बधाई हो शर्मा जी! आपका AI सेल्समैन एक्टिवेट हो चुका है।  
     > अब बस 1 मिनट में अपनी दुकान का नाम और 2 मुख्य बातें बता दीजिए, मैं तुरंत सीखना शुरू करता हूँ!"*

---

## 3. Jio Habit-Loop & Retention Strategy

| Day | System Action | Psychological Trigger |
| :--- | :--- | :--- |
| **Day 1–3** | AI answers mock & live queries, sends daily interview questions. | **Value Realization:** Owner sees zero effort required. |
| **Day 4–6** | AI sends morning WhatsApp digest: *"Today 8 leads engaged, 2 quotes sent"*. | **Habit Formation:** Owner relies on daily reports. |
| **Day 7** | Soft WhatsApp Alert: *"Your 7-day trial was successful! Regular Pro Plan renews tomorrow at ₹1,499."* | **Loss Aversion:** Disabling this will paralyze night sales. |
| **Day 8** | Razorpay UPI AutoPay automatically debits ₹1,499. | **Zero Friction Renewal.** |
