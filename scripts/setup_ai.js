const fs = require('fs');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// 1. Read Gemini Key from free_ai_gateway/.env
const gatewayEnv = fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\free_ai_gateway\\.env', 'utf8');
let geminiKey = '';
for (const line of gatewayEnv.split('\n')) {
  if (line.startsWith('GEMINI_API_KEY=')) {
    geminiKey = line.split('=')[1].trim();
    break;
  }
}

if (!geminiKey) {
  console.error('Gemini Key not found!');
  process.exit(1);
}
console.log('Gemini Key loaded successfully! (length: ' + geminiKey.length + ')');

// 2. Encryption helper
const encryptionKey = 'fbf17d663fa59a3358bcdb1540938fbb634339a5bfab1c378d752dcff533175d';
function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return iv.toString('hex') + ':' + encrypted + ':' + authTag.toString('hex');
}

const encryptedKey = encrypt(geminiKey);

// 3. Connect to Supabase
const supabase = createClient(
  'https://pkgdlegabfwqmnjqterb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZ2RsZWdhYmZ3cW1uanF0ZXJiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDUxNjI4NCwiZXhwIjoyMTA2MDkyMjg0fQ.7Mgn0Ay_asKpLWych9z-OkPzQdN322exz4PveS23Jt0'
);

const systemPrompt = "Aap Jainam Solar Energy (Promoted by Mohit P Jain) ke official AI Sales & Customer Support Assistant hain.\n" +
"Aapka uddeshya customers ko Solar Rooftop, PM Surya Ghar Muft Bijli Yojana, solar panels, aur subsidies ke baare me sahi aur saral jankari dena hai.\n\n" +
"Niyam:\n" +
"1. Grahak se hamesha aadar aur samman ke sath baat karein (Namaste / Jai Jinendra jahan uchit ho).\n" +
"2. Hinglish ya Hindi me natural tareeqe se baat karein jaise ek samajhdar sales executive karta hai.\n" +
"3. WhatsApp ke hisab se answers hamesha short, clear aur to-the-point rakhein (zyada lambe paragraphs mat likhein).\n" +
"4. Grahak ko unka monthly bijli bill ya rooftop space batane ko kahein taaki hum unhe exact savings aur subsidy estimate de sakein.\n" +
"5. Agar koi bada decision ya inspection mang raha ho, to batayein ki hamari team jald hi unhe direct call/visit karegi.";

async function setupAI() {
  const { data: profile, error: profErr } = await supabase.from('profiles').select('user_id, account_id').eq('email', 'mohit12836@gmail.com').single();
  if (profErr || !profile) {
    console.error('Profile error:', profErr);
    process.exit(1);
  }
  console.log('Account ID:', profile.account_id);

  const { data: existing } = await supabase.from('ai_configs').select('id').eq('account_id', profile.account_id).maybeSingle();

  if (existing) {
    const { error: updErr } = await supabase.from('ai_configs').update({
      provider: 'openai',
      model: 'gemini-2.5-flash',
      api_key: encryptedKey,
      system_prompt: systemPrompt,
      is_active: true,
      auto_reply_enabled: true,
      auto_reply_max_per_conversation: 5,
      updated_at: new Date().toISOString()
    }).eq('id', existing.id);
    if (updErr) console.error('Update error:', updErr);
    else console.log('AI_CONFIG_UPDATED_SUCCESSFULLY!');
  } else {
    const { error: insErr } = await supabase.from('ai_configs').insert({
      account_id: profile.account_id,
      created_by: profile.user_id,
      provider: 'openai',
      model: 'gemini-2.5-flash',
      api_key: encryptedKey,
      system_prompt: systemPrompt,
      is_active: true,
      auto_reply_enabled: true,
      auto_reply_max_per_conversation: 5
    });
    if (insErr) console.error('Insert error:', insErr);
    else console.log('AI_CONFIG_INSERTED_SUCCESSFULLY!');
  }
}

setupAI().catch(console.error);
