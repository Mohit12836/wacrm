# 📜 LIVING PROJECT MEMORY & DECISION LOG (SSOT)

**Project:** Autonomous WhatsApp AI CRM & SaaS Suite  
**Single Source of Truth (SSOT)**  
**Last Updated:** 2026-10-02  

---

## 1. Project Background & Codebase Audit History

| Codebase | Location / URL | Tech Stack | Status & Role in Ecosystem |
| :--- | :--- | :--- | :--- |
| **`wacrm`** | `C:\Users\hp\.gemini\antigravity\scratch\wacrm` / `wacrm-eta-dusky.vercel.app` | Next.js 16 + React 19 + Supabase + xyflow + Tailwind v4 | **Primary Production Base:** Chosen for ultra-modern UI/UX, speed, visual flow builder, and serverless zero-maintenance hosting on Vercel. |
| **`vismart-whatsapp-crm`** | `C:\Users\hp\.gemini\antigravity\scratch\vismart-whatsapp-crm` / `vismart.cloud` | Laravel 10 + PHP 8.1 + MySQL (LivelyWorks/WhatsMark) | **Reference Engine:** Evaluated for SaaS billing logic, Meta embedded connection patterns, and multi-channel architecture on VPS. |
| **`ai-customer-crm`** | `Mohit12836/ai-customer-crm` / `ai-customer-crm.vercel.app` | Next.js 14 + Supabase | **Archived:** Learning/Starter CRUD project without live WhatsApp integration. |

---

## 2. Core Strategic Decisions Log

### Decision 1: Unified Next.js 16 Foundation (`wacrm` base)
- **Rationale:** Serverless Vercel + Supabase architecture eliminates VPS queue crashes, supervisor maintenance, and slow page loads.
- **Action:** Port SaaS multi-tenancy and Razorpay AutoPay into `wacrm`.

### Decision 2: Self-Selling Meta AI Agent (The AI Sells the AI)
- **Rationale:** Eliminates cold calling. Prospects experience a live roleplay demo on WhatsApp, receive an automated pitch, and swipe ₹99 UPI AutoPay directly in chat.
- **Action:** Build the 4-state autonomous acquisition machine in Meta Cloud API webhook handler.

### Decision 3: Contextual Hybrid RAG & Daily WhatsApp Interviewer
- **Rationale:** Business owners don't fill web forms. The bot interviews the owner on WhatsApp (text/voice notes), filters noise in staging, asks for 1-click confirmation, and indexes facts into the knowledge graph.
- **Action:** Implement staging tables and anti-leak data vault (no raw PDF export).

### Decision 4: Modular AI Agent Marketplace
- **Rationale:** Radical simplicity for clients (toggle switches for Sales Closer, Booking, Payment, Recovery) + high-margin upsells for locked features.
- **Action:** Build the 1-click agent toggle dashboard UI.

---

## 3. Implementation Roadmap Tracker

- [x] Comprehensive Codebase Audit (`wacrm` vs `vismart` vs `ai-customer-crm`)
- [x] Core Architecture & System Blueprints documented
- [x] RAG Memory & Anti-Leak Staging Specification documented
- [x] Self-Selling ₹99 AutoPay Funnel Specification documented
- [x] AI Agent Marketplace Architecture documented
- [ ] Database Migration for Multi-Tenant Organizations & Staging Memory
- [ ] Self-Selling Inbound Roleplay Webhook Handler Implementation
- [ ] Razorpay UPI AutoPay Subscriptions API Integration
- [ ] WhatsApp Daily Owner Interviewer Cron Engine
- [ ] 1-Click AI Agent Marketplace UI in `wacrm`
- [ ] 1-Line JavaScript Website Live Chat Widget
