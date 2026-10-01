# 👑 JAINAM SOLAR & AI CRM - ARCHITECTURE & KNOWLEDGE BASE MAP
*Document Version: 1.0.0 | Date: 2026-10-01*
*Target Business: Jainam Solar Energy (Promoted by Mohit P Jain)*
*Official Registered WhatsApp: +91 92032 45034*
*Live Production URL: https://wacrm-eta-dusky.vercel.app*

---

## 📌 1. EXECUTIVE OVERVIEW (सिस्टम का नक्शा)

यह फ़ाइल आपके पूरे सिस्टम की **सेंट्रल गाइड (Master Blueprint)** है। जब भी कोड में कुछ जोड़ना, बदलना या नया AI फ़ीचर डालना हो, तो किसी को भी 1000 फ़ाइलों में भटकने की ज़रूरत नहीं है। सब कुछ यहाँ मैप किया हुआ है।

```
                                ┌─────────────────────────┐
                                │   Customer on WhatsApp  │
                                │    (+91 92032 45034)    │
                                └────────────┬────────────┘
                                             │
                                             ▼
                                ┌─────────────────────────┐
                                │  Meta Cloud API Webhook │
                                │   (HMAC Signed Post)    │
                                └────────────┬────────────┘
                                             │
                                             ▼
                       ┌───────────────────────────────────────────┐
                       │   Vercel Next.js 16 Webhook Engine        │
                       │ (/api/whatsapp/webhook/route.ts)          │
                       └─────┬───────────────────────────────┬─────┘
                             │                               │
                      (Save Chat)                      (Trigger AI)
                             ▼                               ▼
                 ┌───────────────────────┐       ┌───────────────────────┐
                 │  Supabase Postgres DB │       │ Google Gemini 2.5     │
                 │ (pkgdlegabfwqmnjqterb)│       │ Sales Closer Brain    │
                 │  - Contacts / Leads   │       │ (/src/lib/ai/...)     │
                 │  - Conversations      │       └───────────┬───────────┘
                 │  - Knowledge Chunks   │                   │
                 └───────────────────────┘                   ▼
                             ▲                   ┌───────────────────────┐
                             │                   │  Direct WhatsApp Send │
                             └───────────────────┤ (Automated Quotation/ │
                                                 │   Subsidy / Handoff)  │
                                                 └───────────────────────┘
```

---

## 🗂️ 2. DIRECTORY MAP (कहाँ क्या है?)

| काम (Task) | फ़ाइल पाथ (File Path) | क्या करता है? |
| :--- | :--- | :--- |
| 🧠 **AI Sales Prompt & Rules** | `src/lib/ai/defaults.ts` | AI का सेल्स बिहेवियर, टोन और बातचीत का अंदाज़ |
| ⚡ **AI Auto-Reply Dispatcher**| `src/lib/ai/auto-reply.ts` | नया मैसेज आने पर AI कब रिप्लाई करेगा और कब इंसान को देगा |
| 📚 **Knowledge Base & RAG**    | `src/lib/ai/knowledge.ts` | कंपनी की PDF/FAQ/प्राइस लिस्ट को सर्च करके जवाब देना |
| 🤖 **Multi-LLM Engine**        | `src/lib/ai/providers/openai.ts` | Gemini, Groq, DeepSeek या OpenAI में स्विच करना |
| 📩 **WhatsApp Webhook Inbound**| `src/app/api/whatsapp/webhook/route.ts` | Meta से मैसेज रिसीव करना और डेटाबेस में डालना |
| 📤 **WhatsApp Send Outbound**  | `src/lib/whatsapp/meta-api.ts` | ग्राहक को टेक्स्ट, इमेज, बटन या ब्रोशर भेजना |
| 🗄️ **Database Migrations**     | `supabase/combined_all_migrations.sql` | 42 टेबल्स (Leads, Pipelines, Broadcasts, AI) |
| ⚙️ **Secrets & Config**        | `.env.local` | Meta App Secret, Supabase Keys, Encryption Key |

---

## ☀️ 3. JAINAM SOLAR SALES KNOWLEDGE (AI क्या जानता है?)

AI को निम्नलिखित सोलर नॉलेज पर ट्रेंड किया गया है:
1. **योजना:** PM सूर्य घर मुफ़्त बिजली योजना (PM Surya Ghar Muft Bijli Yojana).
2. **सब्सिडी संरचना (Subsidy Structure):**
   - **1 kW System:** ₹30,000 केंद्र सरकार सब्सिडी (छत चाहिए: ~100 sqft).
   - **2 kW System:** ₹60,000 केंद्र सरकार सब्सिडी (छत चाहिए: ~200 sqft).
   - **3 kW System या अधिक:** फ्लैट ₹78,000 सब्सिडी (छत चाहिए: ~300 sqft).
3. **मासिक बचत:**
   - 1 kW: ~120 यूनिट/माह (~₹700-₹900 बचत).
   - 2 kW: ~240 यूनिट/माह (~₹1,500-₹1,800 बचत).
   - 3 kW: ~360 यूनिट/माह (बिजली का बिल लगभग ₹0).
4. **सेल्स लक्ष्य (Sales Goal):**
   - ग्राहक से पूछना: *"आपका औसत मासिक बिजली बिल कितना आता है?"* और *"छत पर कितनी जगह उपलब्ध है?"*
   - सही किलोवाट (kW) कैलकुलेट करके बताना और साइट सर्वे के लिए नाम/पता लेना।
   - सीधे पेमेंट या फाइनल क्लोजिंग के लिए प्रोमोटर **Mohit P Jain** से बात कराना।

---

## 🛠️ 4. 1-CLICK SCRIPTS (आपके लिए आसान टूल्स)

बिना किसी कमांड को याद रखे काम करने के लिए 4 शॉर्टकट बने हुए हैं:
- `manage_wacrm.bat` (डेस्कटॉप पर भी मौजूद है): सब कुछ एक ही मेनू से कंट्रोल करें।
- `push_github.bat`: जब भी कोड में बदलाव हो, 1-क्लिक में GitHub पर भेजें।
- `deploy_vercel.bat`: 1-क्लिक में लाइव वेबसाइट अपडेट करें।
- `start_crm.bat`: कंप्यूटर पर लोकल सर्वर और टनल शुरू करें।

---

## 🚀 5. भविष्य के बदलावों के नियम (Change Protocol)
- किसी भी बदलाव से पहले हमेशा इस `ARCHITECTURE.md` को रेफर करें।
- हर नए फ़ीचर के बाद `push_github.bat` चलाकर कोड को सुरक्षित रखें।
