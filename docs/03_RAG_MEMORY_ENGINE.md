# 🧠 CONTEXTUAL HYBRID RAG & CONTINUOUS KNOWLEDGE STAGING SPECIFICATION

**Version:** 1.0.0  
**Target:** Long-Context Entity RAG, WhatsApp Owner Interviewer, Anti-Hallucination, & Anti-Leak Isolation  

---

## 1. The Core Challenge & Architecture Solution

### ⚠️ The Problem:
Traditional naive RAG chunks text into isolated 500-token blocks. If a base fact is on Line 1 (*"5kW Solar cost is ₹2.2 Lakh"*) and a vital restriction is on Line 1000 (*"Government subsidy applies ONLY to domestic DISCOM meters, not commercial shops"*), traditional RAG misses the constraint and gives inaccurate answers.

### ✅ The Solution: Multi-Layer Contextual RAG Graph

```mermaid
flowchart TD
    subgraph Ingestion["📥 Knowledge Ingestion (via WhatsApp Voice/Text)"]
        W1["Owner sends Audio/Text on WhatsApp"]
        W2["Whisper AI Transcribes Audio"]
        ST["Staging & Fact Extraction LLM"]
    end

    subgraph Staging["🧪 Temp Staging & Verification"]
        TMP["`temp_knowledge_staging` Table"]
        VAL["AI drafts structured fact & asks owner: 'Confirm YES/NO?'"]
    end

    subgraph PermanentBrain["🏛️ Production Knowledge Base (RAG)"]
        ENT["Entity & Rule Key-Value Store (Postgres)"]
        VEC["Semantic Embeddings (text-embedding-3-small)"]
        KG["Cross-Entity Relationship Linker"]
    end

    subgraph QueryExecution["🎯 Customer Query Processing"]
        Q["Customer Query ('5kW Solar for my Shop')"]
        HYB["Hybrid Search: Dense Vector + Lexical BM25"]
        SYN["Cross-Context Multi-Fact Synthesizer"]
        ANS["Accurate Context-Aware Answer"]
    end

    Ingestion --> Staging
    Staging -->|Owner confirms YES| PermanentBrain
    QueryExecution --> PermanentBrain
    PermanentBrain --> QueryExecution
```

---

## 2. Daily WhatsApp Owner Interviewer Bot Engine

1. **Scheduled Daily Cron:** Fires at 11:00 AM local time to the business owner's registered WhatsApp number.
2. **Dynamic Knowledge Gap Detection:** System checks which domains are missing facts (e.g. `Refund Policy`, `Working Hours`, `Discount Rules`, `Delivery Time`).
3. **Conversational Questioning:**
   - *"शर्मा जी, आज के 2 छोटे सवाल: 1) क्या आप संडे को भी दुकान खोलते हैं? 2) क्या रिटर्न पर पूरा पैसा वापस मिलता है?"*
4. **Noise Stripping & Rule Generation:**
   - Owner voice note: *"अरे भाई संडे को सिर्फ 2 बजे तक खुलती है, और रिटर्न में 7 दिन के अंदर सामान बदलना होगा, कैश वापस नहीं होगा।"*
   - Extracted Rules:
     - `Rule_1`: `Store_Hours.Sunday` = `Open until 2:00 PM`
     - `Rule_2`: `Return_Policy.Window` = `7 Days from delivery`
     - `Rule_3`: `Return_Policy.Refund_Type` = `Exchange Only (No Cash Refund)`
5. **Human-in-the-Loop Confirmation:**
   - AI: *"शर्मा जी, मैंने ये 3 नियम तैयार किए हैं। क्या इन्हें पक्का कर दूँ? (हाँ/नहीं)"*
   - Once confirmed, saved to permanent production tables.

---

## 3. Anti-Data-Leak & Lock-In Architecture

1. **No Raw Knowledge Export:** There is **NO** button or endpoint in the client portal to export the full knowledge base or rule set into a downloadable PDF/Excel.
2. **Encrypted Vector Weights:** The business logic is stored as vector weights and entity relationships inside the database.
3. **Zero-Churn Retention:** Because the bot has absorbed the entire institutional brain of the shop, the owner cannot switch to any other tool without losing their trained AI employee.
