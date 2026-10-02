# 📋 PRODUCT SPECIFICATION & BRAINSTORMING (SPEC.MD)

**Project Name:** Vismart AI Suite (Autonomous 24/7 WhatsApp AI Employee & CRM SaaS)  
**Version:** 1.0.0-PROD  
**Target Market:** Small-to-Medium Businesses (SMBs), Clinics, Coaching Institutes, Solar Installers, Real Estate & D2C Brands  

---

## 1. Problem Statement & Market Opportunity
Traditional businesses lose 40%–60% of inbound leads because:
1. **Missed Night & Weekend Leads:** Inquiries arrive outside working hours and buy from competitors before morning.
2. **Number Ban Fear:** Unofficial scraping tools get business WhatsApp numbers banned.
3. **Manual Data Entry Exhaustion:** Sales agents forget to update CRM pipelines, follow up with quotes, or collect payments.
4. **Complex Software Friction:** Traditional SaaS tools (HubSpot, Salesforce, Wati) are too complicated for non-technical shop owners.

---

## 2. Product Solution & Value Proposition
**Vismart AI Suite** is a **Self-Selling, Autonomous 24/7 AI Employee & CRM** built on the **Official WhatsApp Cloud API**:
- **Zero-Friction Inbound Roleplay:** AI demonstrates itself live on WhatsApp and onboards business owners for a ₹99 trial via UPI AutoPay.
- **WhatsApp Daily Interviewer:** AI interviews the owner daily via short voice/text chats to learn their business rules without filling web forms.
- **Contextual Hybrid RAG:** Synthesizes distant facts (e.g. Line 1 base price + Line 1000 subsidy exception) with zero hallucination.
- **1-Click AI Agent Marketplace:** iPhone App-Store style toggle switches (`Sales Closer`, `Booking`, `Payment`, `Recovery`, `Voice Notes`).
- **Dynamic Customer Persona Graph:** Remembers customer behavior, tone, budget, and future ₹8L expansion signals.
- **Master SuperAdmin Cockpit:** Gives the founder 100% granular control over commissions (0%–5%), feature locks, and macro market intelligence.

---

## 3. User Roles & Permission Matrix

| Role | Access Level | Primary Dashboard Capabilities |
| :--- | :--- | :--- |
| **SuperAdmin (Founder / You)** | Master System Control | Manage all tenants, adjust commission sliders, toggle feature locks, view global revenue telemetry, inject global AI rules. |
| **Business Owner (Tenant Admin)** | Organization Admin | View live metrics, toggle AI agents, approve learned rules, launch broadcasts, view deals board. |
| **Store Staff / Sales Agent** | Scoped Operator | Live chat in shared inbox, take over from AI, send payment links. Cannot delete contacts or export data. |
| **End Customer (Shopper / Lead)** | WhatsApp End-User | Chats via WhatsApp, sends voice notes, receives catalogs, pays via instant UPI links. |

---

## 4. Technical Constraints & Non-Negotiables
1. **100% Fluid Auto-Fit Responsive:** Zero horizontal scroll across Mobile (320px), Tablet (768px), and Desktop (1440px+).
2. **Serverless Zero-Maintenance:** Next.js 16 Edge Runtime + Supabase PostgreSQL (PgBouncer connection pooling on port 6543).
3. **Sub-500ms Webhook Acknowledgment:** Meta webhooks must return `200 OK` in < 500ms; background processing handled asynchronously.
4. **Anti-Leak Knowledge Vault:** Knowledge graphs and trained vector weights cannot be exported as bulk CSV/PDF.
