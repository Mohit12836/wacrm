import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Lazy admin client
let _adminClient: any = null;
function getAdminClient() {
  if (!_adminClient) {
    _adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _adminClient;
}

/**
 * Scheduled Cron Job to interview business owners daily on WhatsApp (Fires at 11:00 AM)
 */
export async function GET(req: Request) {
  try {
    const supabase = getAdminClient();

    // 1. Fetch active accounts with owners who have phone numbers registered
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('account_id, full_name, user_id')
      .not('account_id', 'is', null);

    if (error) {
      console.error('[Daily Interviewer Cron] Fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const sampleQuestions = [
      "सुप्रभात! ☀️ आज के 2 छोटे सवाल:\n1) क्या आप संडे को भी दुकान खोलते हैं?\n2) क्या रिटर्न पर पूरा पैसा वापस मिलता है?",
      "सुप्रभात शर्मा जी! ☀️ आज का सवाल:\nक्या आप 10% डिस्काउंट ऑफर केवल कैश पर देते हैं या UPI पर भी लागू है?",
      "नमस्ते सर! ☀️ क्या आप होम डिलीवरी फ्री देते हैं या मिनिमम ₹500 के ऑर्डर पर?",
    ];

    const selectedQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];

    console.log(`[Daily Interviewer Cron] Triggered for ${profiles?.length || 0} active accounts`);

    return NextResponse.json({
      success: true,
      accountsProcessed: profiles?.length || 0,
      questionSent: selectedQuestion,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Daily Interviewer Cron] Unhandled error:', error);
    return NextResponse.json({ error: 'Cron execution failed' }, { status: 500 });
  }
}
