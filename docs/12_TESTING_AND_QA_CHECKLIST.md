# ✅ PRE-FLIGHT TESTING & CLIENT ONBOARDING QA CHECKLIST

**Version:** 1.0.0  
**Target:** 100% Error-Free Client Onboarding and Verification Standard  

---

## 1. Meta WhatsApp Webhook & Connectivity Check
- [ ] Send test "Hi" from a fresh WhatsApp number to the connected business phone.
- [ ] Verify 200 OK returned by `/api/whatsapp/webhook` within 500ms.
- [ ] Verify message appears instantly in the CRM Shared Inbox without manual page refresh.
- [ ] Send audio voice note; verify Whisper AI transcript and accurate contextual reply.

---

## 2. Self-Selling Roleplay & ₹99 AutoPay Check
- [ ] Send "Demo" to the master bot number.
- [ ] Test switching personas (e.g. Coaching -> Solar -> Clinic).
- [ ] Click the generated ₹99 UPI AutoPay link; verify Razorpay checkout opens cleanly.
- [ ] Simulate `subscription.charged` webhook; verify tenant organization is created.

---

## 3. Daily Interviewer & Staging RAG Check
- [ ] Send new rule from owner's number (*"Sunday open till 2 PM"*).
- [ ] Check `temp_knowledge_staging` table for extracted entity/rule.
- [ ] Reply "YES" to confirmation message; verify fact gets indexed in `knowledge_nodes`.
- [ ] Ask bot a customer question testing the new rule; verify accurate answer synthesis.

---

## 4. Website Widget Integration Check
- [ ] Embed `<script src="https://vismart.cloud/widget.js" ...></script>` on test page.
- [ ] Verify widget renders smoothly at bottom-right with fluid responsiveness across mobile and desktop.
- [ ] Send message from web widget; verify it lands in the CRM Shared Inbox in real-time.
