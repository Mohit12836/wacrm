# 🚀 DEPLOYMENT & DEVOPS RUNBOOK

**Version:** 1.0.0  
**Target:** Vercel Edge Serverless Deployment + Supabase DB + GitHub CI/CD  

---

## 1. Environment Variables Configuration

| Variable Key | Description | Example / Target Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Anon Key for Client Auth | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Key for Webhook / Background Jobs | `eyJhbGciOi...` |
| `META_APP_ID` | Facebook Developer App ID | `123456789012345` |
| `META_APP_SECRET` | Facebook App Secret for HMAC Webhook verification | `a1b2c3d4...` |
| `META_WEBHOOK_VERIFY_TOKEN` | Custom string verified during Meta Webhook setup | `vismart_secure_verify_2026` |
| `RAZORPAY_KEY_ID` | Razorpay Master Key ID | `rzp_live_xxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret | `secret_xxxx` |
| `RAZORPAY_WEBHOOK_SECRET` | Secret to verify Razorpay AutoPay webhook | `rzp_wh_secret_xxxx` |
| `OPENAI_API_KEY` / `GROQ_API_KEY` | AI LLM routing keys | `sk-xxxx` |

---

## 2. Zero-Downtime Deployment Flow
1. **GitHub Push:** Every commit to branch `main` triggers automated Vercel build.
2. **Pre-flight Lint & Typecheck:** Runs `npx tsc --noEmit` and `npm run lint`.
3. **Edge Optimization:** Webhook endpoints `/api/whatsapp/webhook` execute at Edge with < 50ms latency.
