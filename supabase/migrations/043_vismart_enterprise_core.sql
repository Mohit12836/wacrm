-- ============================================================
-- 043_vismart_enterprise_core.sql
--
-- Core Enterprise Schema Extension for Vismart AI Suite:
--   1. subscriptions: Razorpay UPI AutoPay, billing tiers & commission rates
--   2. temp_knowledge_staging: Daily WhatsApp Interviewer noise filter & approval queue
--   3. enabled_agents: 1-Click AI Agent Marketplace toggles & configs
--   4. customer_personas: Dynamic behavioral persona & future upsell opportunity radar
--   5. audit_confirmation_logs: Human-in-the-loop multi-tier security audit trail
--
-- Idempotent & fully RLS-secured using is_account_member() helper.
-- ============================================================

-- 1. SUBSCRIPTIONS TABLE (Razorpay UPI AutoPay & Tier Management)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_plan_id TEXT,
  razorpay_customer_id TEXT,
  plan_tier TEXT NOT NULL DEFAULT 'trial' CHECK (plan_tier IN ('trial', 'starter', 'pro_growth', 'vip_agency')),
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'authenticated' CHECK (status IN ('authenticated', 'active', 'pending', 'halted', 'cancelled')),
  commission_rate NUMERIC(5,4) NOT NULL DEFAULT 0.0000, -- e.g. 0.0200 = 2%
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_account_subscription UNIQUE (account_id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_account_id ON subscriptions(account_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- 2. TEMP KNOWLEDGE STAGING TABLE (Daily WhatsApp Interviewer Noise Filter)
CREATE TABLE IF NOT EXISTS temp_knowledge_staging (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  sender_phone TEXT NOT NULL,
  raw_message_text TEXT NOT NULL,
  extracted_entity TEXT,
  extracted_attribute TEXT,
  extracted_value TEXT,
  confidence_score NUMERIC(3,2) DEFAULT 0.95,
  status TEXT NOT NULL DEFAULT 'pending_confirmation' CHECK (status IN ('pending_confirmation', 'confirmed', 'rejected')),
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_temp_knowledge_account_id ON temp_knowledge_staging(account_id);
CREATE INDEX IF NOT EXISTS idx_temp_knowledge_status ON temp_knowledge_staging(status);
CREATE INDEX IF NOT EXISTS idx_temp_knowledge_phone ON temp_knowledge_staging(sender_phone);

-- 3. ENABLED AGENTS TABLE (1-Click Agent Marketplace Hub)
CREATE TABLE IF NOT EXISTS enabled_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  agent_slug TEXT NOT NULL CHECK (agent_slug IN (
    'sales_closer',
    'booking_calendar',
    'upi_payments',
    'abandoned_recovery',
    'voice_notes',
    'google_reviews',
    'custom_niche'
  )),
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_account_agent_slug UNIQUE (account_id, agent_slug)
);

CREATE INDEX IF NOT EXISTS idx_enabled_agents_account_id ON enabled_agents(account_id);

-- 4. CUSTOMER PERSONAS TABLE (Dynamic Behavioral & Future Upsell Radar)
CREATE TABLE IF NOT EXISTS customer_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  behavioral_traits JSONB NOT NULL DEFAULT '{}'::jsonb,
  future_opportunities JSONB NOT NULL DEFAULT '[]'::jsonb,
  lifetime_value_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  last_analyzed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_contact_persona UNIQUE (contact_id)
);

CREATE INDEX IF NOT EXISTS idx_customer_personas_account_id ON customer_personas(account_id);
CREATE INDEX IF NOT EXISTS idx_customer_personas_contact_id ON customer_personas(contact_id);

-- 5. AUDIT CONFIRMATION LOGS TABLE (Multi-Tier Safety & Verification Trail)
CREATE TABLE IF NOT EXISTS audit_confirmation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('level_1', 'level_2', 'level_3')),
  confirmation_steps INTEGER NOT NULL DEFAULT 1,
  confirmed_by_phone TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_account_id ON audit_confirmation_logs(account_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_confirmation_logs(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE temp_knowledge_staging ENABLE ROW LEVEL SECURITY;
ALTER TABLE enabled_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_confirmation_logs ENABLE ROW LEVEL SECURITY;

-- Subscriptions: viewers+ may read, admins+ may write
DROP POLICY IF EXISTS "subscriptions_select_member" ON subscriptions;
CREATE POLICY "subscriptions_select_member" ON subscriptions
  FOR SELECT TO authenticated
  USING (is_account_member(account_id, 'viewer'));

DROP POLICY IF EXISTS "subscriptions_admin_manage" ON subscriptions;
CREATE POLICY "subscriptions_admin_manage" ON subscriptions
  FOR ALL TO authenticated
  USING (is_account_member(account_id, 'admin'))
  WITH CHECK (is_account_member(account_id, 'admin'));

-- Temp Knowledge Staging: agents+ may read and manage
DROP POLICY IF EXISTS "temp_knowledge_select_member" ON temp_knowledge_staging;
CREATE POLICY "temp_knowledge_select_member" ON temp_knowledge_staging
  FOR SELECT TO authenticated
  USING (is_account_member(account_id, 'viewer'));

DROP POLICY IF EXISTS "temp_knowledge_agent_manage" ON temp_knowledge_staging;
CREATE POLICY "temp_knowledge_agent_manage" ON temp_knowledge_staging
  FOR ALL TO authenticated
  USING (is_account_member(account_id, 'agent'))
  WITH CHECK (is_account_member(account_id, 'agent'));

-- Enabled Agents: viewers+ may read, admins+ may manage
DROP POLICY IF EXISTS "enabled_agents_select_member" ON enabled_agents;
CREATE POLICY "enabled_agents_select_member" ON enabled_agents
  FOR SELECT TO authenticated
  USING (is_account_member(account_id, 'viewer'));

DROP POLICY IF EXISTS "enabled_agents_admin_manage" ON enabled_agents;
CREATE POLICY "enabled_agents_admin_manage" ON enabled_agents
  FOR ALL TO authenticated
  USING (is_account_member(account_id, 'admin'))
  WITH CHECK (is_account_member(account_id, 'admin'));

-- Customer Personas: viewers+ may read, agents+ may manage
DROP POLICY IF EXISTS "customer_personas_select_member" ON customer_personas;
CREATE POLICY "customer_personas_select_member" ON customer_personas
  FOR SELECT TO authenticated
  USING (is_account_member(account_id, 'viewer'));

DROP POLICY IF EXISTS "customer_personas_agent_manage" ON customer_personas;
CREATE POLICY "customer_personas_agent_manage" ON customer_personas
  FOR ALL TO authenticated
  USING (is_account_member(account_id, 'agent'))
  WITH CHECK (is_account_member(account_id, 'agent'));

-- Audit Logs: viewers+ may read, agents+ may insert
DROP POLICY IF EXISTS "audit_logs_select_member" ON audit_confirmation_logs;
CREATE POLICY "audit_logs_select_member" ON audit_confirmation_logs
  FOR SELECT TO authenticated
  USING (is_account_member(account_id, 'viewer'));

DROP POLICY IF EXISTS "audit_logs_agent_insert" ON audit_confirmation_logs;
CREATE POLICY "audit_logs_agent_insert" ON audit_confirmation_logs
  FOR INSERT TO authenticated
  WITH CHECK (is_account_member(account_id, 'agent'));
