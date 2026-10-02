# 📊 UNIT ECONOMICS & PROFIT MARGIN ANALYSIS

**Version:** 1.0.0  
**Target:** Financial Modeling per Client, Infrastructure Costs, and SaaS Profit Margins  

---

## 1. Per-Client Cost vs. Revenue Breakdown (Pro Plan: ₹2,999/mo)

| Expense Item | Provider | Usage / Unit | Monthly Cost to Us (₹) |
| :--- | :--- | :--- | :--- |
| **Hosting & Compute** | Vercel (Serverless Edge) | ~50k requests / mo | ₹0 (within Pro tier allocation ~₹30/client) |
| **Database & Realtime** | Supabase | PostgreSQL + Vector RAG | ~₹40 / client |
| **AI LLM Reasoning** | Groq / DeepSeek / Gemini Flash | ~2,000 chat completions / mo | ~₹45 / client |
| **Voice Transcriptions** | Whisper AI | ~100 audio notes / mo | ~₹25 / client |
| **Payment Gateway Fee** | Razorpay | 2% on ₹2,999 AutoPay | ~₹60 |
| **Meta WhatsApp Fee** | Meta Cloud API | Client pays directly | ₹0 (Directly billed to client's card) |
| **TOTAL MONTHLY COST PER CLIENT** | | | **~₹200 / month** |

---

## 2. Profit Margin Summary

$$\text{Monthly Revenue per Client} = ₹2,999$$
$$\text{Total Infrastructure Cost} = ₹200$$
$$\textbf{Net Profit per Client} = \mathbf{₹2,799 \text{ / month (93.3\% Profit Margin)}}$$

- **10 Active Clients:** $10 \times ₹2,799 = \mathbf{₹27,990 \text{ / month net profit}}$
- **50 Active Clients:** $50 \times ₹2,799 = \mathbf{₹1,39,950 \text{ / month net profit}}$
- **200 Active Clients:** $200 \times ₹2,799 = \mathbf{₹5,59,800 \text{ / month net profit}}$
