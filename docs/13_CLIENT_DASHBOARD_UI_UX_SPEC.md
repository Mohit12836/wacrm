# 📱 CLIENT DASHBOARD UI/UX & LAYOUT SPECIFICATION

**Version:** 1.0.0  
**Target:** 100% Non-Technical, Fluid Auto-Fit, White-Labeled Client Experience  

---

## 1. Client Dashboard Layout Wireframe

```
+----------------------------------------------------------------------------------------------------+
|  [Logo] Sharma Electronics  |  WhatsApp: 🟢 Active (+91 9893XXXXXX)  |  Plan: Pro  | [Staff Profile] |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [ 📈 आज की नई लीड्स: 28 ]  [ 🤖 AI ने संभाली: 26 ]  [ 💰 वसूली: ₹42,500 ]  [ ⚡ स्पीड: 1.8s ]      |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
|  [ 💬 लाइव चैट ]  |  [ 🤖 AI दिमाग & एजेंट्स ]  |  [ 📨 ऑफर भेजें ]  |  [ 📊 लीड्स पाइपलाइन ]          |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [Left: चैट लिस्ट]            [Center: व्हाट्सएप चैट स्क्रीन]          [Right: ग्राहक प्रोफाइल & बटन्स] |
|  - राहुल (🔥 Hot Lead)         - राहुल: "फ्रिज का रेट क्या है?"          - नाम: राहुल वर्मा               |
|  - अमित (💰 Paid)              - AI: "सर, ₹24,000 (3 साल वारंटी)"       - स्थिति: Hot Lead (₹24,000)     |
|  - विकास (📅 Booked)           - राहुल: [Voice Note भेजा 🎙️]           - [ 💳 UPI लिंक भेजें ]          |
|                                - AI: "जी सर, होम डिलीवरी फ्री है।"      - [ 🛑 AI रोकें (मैं बात करूँगा) ]|
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Core Sections Breakdown

### A. Top Impact Header (The "Peace of Mind" Strip)
- **Business Brand & WhatsApp Status:** Shows green badge 🟢 `WhatsApp Active & High Quality`.
- **4 Live Metric Cards:**
  1. `Today's Leads`: Real-time counter of new WhatsApp inquiries.
  2. `AI Auto-Handled`: Shows 90%+ handled without owner touching the phone.
  3. `Total Money Collected`: Dynamic payments received today via WhatsApp UPI.
  4. `Average AI Response Time`: 1.8 seconds (24/7 reliability).

---

### B. The 4 Main Tabs (Radical Simplicity)

#### 1. 💬 Live Omnichannel Inbox (लाइव ग्राहक चैट)
- **Real-Time Stream:** Incoming WhatsApp messages, voice notes, and photos appear instantly.
- **Smart Tags:** `🔥 Hot Lead`, `💰 Paid`, `📅 Meeting Booked`, `⏳ Needs Attention`.
- **Human Takeover Switch:** One click on `[ 🛑 Pause AI ]` lets the owner type manually; one click on `[ 🤖 Resume AI ]` hands control back to the AI.
- **Quick Action Buttons:** Generate UPI link, send PDF brochure, or book appointment slot with 1 tap.

#### 2. 🤖 AI Employee Brain & Marketplace (AI एजेंट्स और ज्ञान)
- **Toggle Switches for Pre-Built Agents:**
  - `🛒 Sales Closer AI` (Active 🟢)
  - `🩺 Appointment Booking AI` (Active 🟢)
  - `💰 UPI Payment & Invoice AI` (Active 🟢)
  - `🔄 24h Abandoned Recovery AI` (Locked 🔒 - Pro)
  - `🎙️ Hindi Voice Note Transcriber` (Locked 🔒 - Pro)
- **Approved Knowledge Rules:** Clean list of facts learned from daily WhatsApp chats.
- **Add New Fact Button:** `[ ➕ बोलकर या लिखकर नया नियम सिखाएं ]`.

#### 3. 📨 1-Click Broadcast & Offers (ऑफर भेजें)
- Pre-approved festive templates (Diwali, New Year, Weekend Flash Sale).
- 1-Click CSV contact import or filter by tags (e.g. *"Send only to leads who haven't bought yet"*).
- Real-time campaign stats (Sent, Delivered, Read, Clicked).

#### 4. 📊 Sales Pipeline & Deals (लीड्स बोर्ड)
- Visual drag-and-drop Kanban board:
  `New Lead` ➡️ `Interested` ➡️ `Quotation Sent` ➡️ `Payment Received (Won)`.

---

## 3. Strict White-Label & Anti-Leak Rules
- ❌ **No Meta Developer keys or complex webhook URLs are shown.**
- ❌ **No raw database vector exports or bulk knowledge downloads.**
- ❌ **Staff Role Limits:** Staff agents can chat with customers but cannot delete or export client contact lists.
