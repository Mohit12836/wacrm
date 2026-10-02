# 🛍️ AI AGENT MARKETPLACE & 1-CLICK TOGGLE ARCHITECTURE

**Version:** 1.0.0  
**Target:** Modular, Specialized AI Employees with Dynamic Feature Paywalls  

---

## 1. Concept: The "iPhone App Store" for WhatsApp Automation

Instead of overwhelming clients with technical nodes and complicated settings, the dashboard provides pre-built, specialized AI Agents that can be enabled with a single toggle switch.

```mermaid
flowchart LR
    subgraph Hub["🤖 Client AI Agents Hub"]
        A1["🛒 Sales Closer AI\n(Active ✅)"]
        A2["🩺 Booking & Calendar AI\n(Active ✅)"]
        A3["💰 UPI Payment & Invoice AI\n(Locked 🔒 - Pro)"]
        A4["🔄 Abandoned Recovery AI\n(Locked 🔒 - Pro)"]
        A5["🎙️ Hindi Voice Note AI\n(Locked 🔒 - Pro)"]
        A6["🌟 Google Review AI\n(Add-on ₹299/mo)"]
    end

    subgraph Custom["🪄 Master Meta-Agent Builder"]
        CB["Tell AI your niche in Hindi/English ➡️ AI builds custom agent in 30s!"]
    end

    Hub --- Custom
```

---

## 2. Specialized Agent Profiles

### 1. 🛒 Sales Closer Agent
- **Role:** Product qualification, sharing digital catalogs, answering price inquiries, handling counter-objections.
- **Tier:** Included in Starter / Base Plan.

### 2. 🩺 Smart Appointment & Calendar Agent
- **Role:** Checks available slots, confirms doctor consultations / solar site visits / demo classes, and sets WhatsApp reminder alerts.
- **Tier:** Included in Starter / Base Plan.

### 3. 💰 Dynamic Payment & GST Invoice Agent
- **Role:** Generates instant Razorpay/UPI Payment links inside WhatsApp, verifies webhook captures, and automatically sends PDF GST invoices.
- **Tier:** Pro Plan (Locked in Starter).

### 4. 🔄 Abandoned Lead Recovery Agent (The 30% Booster)
- **Role:** Tracks leads who inquired but did not pay within 24 hours. Triggers automated timed follow-ups with limited-time discount coupons.
- **Tier:** Pro Plan (Locked in Starter).

### 5. 🎙️ Hindi/Hinglish Voice Note Agent
- **Role:** Uses Whisper AI to transcribe audio messages from customers, understands intent, and replies naturally in Hindi/Hinglish.
- **Tier:** Pro Plan (Locked in Starter).

### 6. 🌟 Google Review & CSAT Reputation Agent
- **Role:** Sends a polite feedback request and Google Review 5-star direct link 48 hours after order delivery or service completion.
- **Tier:** Add-on / Pro Plan.

---

## 3. Custom Agent Builder (Autonomous Prompt & Schema Compiler)

If a client has a specialized business (e.g. Luxury Car Rental, Astrologer, Wedding Photographer):
1. Client clicks **"Create Custom Agent with AI"**.
2. Voice/Text Input: *"I run a luxury car rental in Jaipur, minimum 2 days booking, ₹5,000 security deposit."*
3. Master LLM compiles:
   - System Prompt & Guardrails
   - Intent Classification Rules
   - Slot Filling State Machine
   - Catalog JSON Schema
4. The new agent appears on their dashboard ready to toggle ON!
