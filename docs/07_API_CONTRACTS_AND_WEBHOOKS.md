# 🔌 API CONTRACTS & WEBHOOKS SPECIFICATION

**Version:** 1.0.0  
**Target:** Meta Cloud API, Razorpay Webhooks, Internal REST Endpoints, and 1-Line JS Web Widget  

---

## 1. Webhooks Overview

### A. Meta WhatsApp Inbound Webhook (`POST /api/whatsapp/webhook`)
- **Headers:** `x-hub-signature-256` (HMAC SHA-256 verified against Meta App Secret).
- **Payload Types Handled:**
  - `messages`: Text, Audio (Voice Note), Interactive (Button/List clicks), Location, Image/Document.
  - `statuses`: Sent, Delivered, Read, Failed (with error code).
- **Processing SLA:** 200 OK returned in < 500ms; event dispatched asynchronously to Agent Router.

### B. Razorpay AutoPay Webhook (`POST /api/billing/razorpay-webhook`)
- **Headers:** `x-razorpay-signature` (HMAC SHA-256 verified with Webhook Secret).
- **Events Handled:**
  - `subscription.authenticated`: ₹99 trial mandate approved.
  - `subscription.charged`: Recurring ₹1,499/mo payment debited successfully.
  - `subscription.halted` / `subscription.cancelled`: Grace period and lock logic.

---

## 2. 1-Line JavaScript Website Live Chat Widget (`GET /widget.js`)

### Embed Snippet for Client Websites (WordPress / Shopify / HTML):
```html
<script 
  src="https://vismart.cloud/widget.js" 
  data-org-id="ORG_UUID_HERE"
  data-color="#25D366" 
  data-position="bottom-right"
  data-mode="hybrid"
  async>
</script>
```

### Modes Supported:
1. `mode="whatsapp_direct"`: Opens pre-filled WhatsApp message directly in user's WhatsApp app.
2. `mode="hybrid"`: In-browser live webchat connected directly to the CRM Shared Inbox with WhatsApp fallback button.
