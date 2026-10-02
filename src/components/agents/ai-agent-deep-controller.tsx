'use client';

import React, { useState } from 'react';
import {
  Bot,
  Sliders,
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldAlert,
  Send,
  RefreshCcw,
  MessageSquare,
  DollarSign,
  Calendar,
  CreditCard,
  Target,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AgentProfile {
  id: string;
  name: string;
  category: string;
  role: string;
  persona: 'Aggressive Closer' | 'Friendly Hinglish Consultant' | 'Polite Professional' | 'Fast Support';
  goal: string;
  maxDiscount: number;
  triggerCondition: string;
  customInstructions: string;
  sampleReplies: string[];
}

export function AiAgentDeepController() {
  const [agents, setAgents] = useState<AgentProfile[]>([
    {
      id: 'agent_sales',
      name: '24/7 WhatsApp Sales Closer',
      category: 'Inbound Sales',
      role: 'Pitch products, answer questions, and negotiate within discount boundaries',
      persona: 'Friendly Hinglish Consultant',
      goal: 'Share digital catalog and get customer to request price quote',
      maxDiscount: 8,
      triggerCondition: 'On every new incoming customer query',
      customInstructions: 'Always greet politely with "Namaste 🙏". Highlight government subsidies and prompt the customer for their monthly electricity bill.',
      sampleReplies: [
        'Namaste! 🙏 Surya Solar me aapka swagat hai. 5kW system par ₹78,000 subsidy mil rahi hai. Kya main aapko quotation bhej doon?',
        'Sir, agar aap aaj confirm karte hain to hum ₹5,000 ka festive voucher bhi apply kar denge!',
      ],
    },
    {
      id: 'agent_booking',
      name: 'Site Visit & Booking Specialist',
      category: 'Appointment Booking',
      role: 'Qualify lead location and book free engineer home/site visit',
      persona: 'Polite Professional',
      goal: 'Confirm full site address and preferred 2-hour inspection time slot',
      maxDiscount: 0,
      triggerCondition: 'When customer asks about installation feasibility or consultation',
      customInstructions: 'Do not discuss detailed pricing until site structure is inspected. Emphasize that the site survey is 100% Free.',
      sampleReplies: [
        'Humare senior engineer kal aapke location par inspect karne aa sakte hain. Kya kal 11:00 AM ka time suitable rahega?',
        'Address confirm karne ke baad main aapko engineer ka live contact card share kar dunga.',
      ],
    },
    {
      id: 'agent_upi',
      name: 'Dynamic UPI & Token Closer',
      category: 'Payments & Invoicing',
      role: 'Generate Razorpay payment links in chat and confirm instant booking token',
      persona: 'Aggressive Closer',
      goal: 'Collect ₹999 booking advance and issue instant digital receipt',
      maxDiscount: 5,
      triggerCondition: 'When customer expresses intent to buy or lock offer',
      customInstructions: 'Create urgency. Tell the user that the subsidy slot is locked for 48 hours once ₹999 token is paid.',
      sampleReplies: [
        'Sir, aapka slot hold karne ke liye ₹999 ka token link generate kiya hai: https://rzp.io/l/vismart-token. Click karke UPI se pay karein.',
        'Payment successful! 🎉 Aapki receipt email & WhatsApp dono par bhej di gayi hai.',
      ],
    },
    {
      id: 'agent_recovery',
      name: '24-Hour Abandoned Lead Re-Engager',
      category: 'Lead Recovery',
      role: 'Follow up automatically with inactive leads who stopped replying',
      persona: 'Friendly Hinglish Consultant',
      goal: 'Offer a limited-time 5% discount coupon to restart the conversation',
      maxDiscount: 10,
      triggerCondition: '24 hours after last customer message with no deal closure',
      customInstructions: 'Keep the message very short and non-pushy. Ask if they have any confusion regarding payment or installation.',
      sampleReplies: [
        'Bhaiya, kal aap solar rooftop ke bare me puchh rahe the. Koi doubt hai to bataiye, aaj ek exclusive 5% coupon available hai!',
      ],
    },
  ]);

  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent_sales');
  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  // Test chat simulation inside controller
  const [testMessages, setTestMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'user', text: 'Hi, 3kW solar system ka kitna kharcha aayega?' },
    {
      sender: 'ai',
      text: 'Namaste! 🙏 3kW Solar Rooftop system ka approx cost ₹1,65,000 aata hai, jisme Govt DBT Subsidy ₹78,000 milne ke baad aapki net cost sirf ₹87,000 padegi. Kya aapki chhat par shadow-free space available hai?',
    },
  ]);
  const [testInput, setTestInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Update active agent properties
  const updateActiveAgent = (field: keyof AgentProfile, value: any) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === activeAgent.id ? { ...a, [field]: value } : a))
    );
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSendTestMessage = () => {
    if (!testInput.trim()) return;
    const userMsg = testInput;
    setTestMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setTestInput('');
    setIsSimulating(true);

    setTimeout(() => {
      let reply = '';
      if (userMsg.toLowerCase().includes('discount') || userMsg.toLowerCase().includes('kam')) {
        reply = `Sir, humari policy ke hisab se hum maximum ${activeAgent.maxDiscount}% ka special discount offer kar sakte hain agar aap aaj token confirm karte hain!`;
      } else if (userMsg.toLowerCase().includes('book') || userMsg.toLowerCase().includes('site')) {
        reply = `Bilkul! Humare engineer kal aapki location par visit kar sakte hain. Kripya apna poora address aur preferred time bataiye.`;
      } else if (userMsg.toLowerCase().includes('pay') || userMsg.toLowerCase().includes('upi')) {
        reply = `Aapka ₹999 booking token link: https://rzp.io/l/solar-token. Pay karte hi slot lock ho jayega!`;
      } else {
        reply = `Ji bilkul! ${activeAgent.customInstructions.split('.')[0]}. Aapka contact save kar liya gaya hai.`;
      }

      setTestMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsSimulating(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sliders className="h-5 w-5 text-primary" />
            Granular AI Agent Personality & Rules Controller
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure exactly how each AI employee speaks, negotiates discounts, and achieves its sales target.
          </p>
        </div>

        {saveSuccess && (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 px-3 py-1.5 text-xs font-semibold animate-in fade-in duration-200">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            AI Rules Saved & Live
          </Badge>
        )}
      </div>

      {/* Select Agent Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {agents.map((ag) => (
          <button
            key={ag.id}
            type="button"
            onClick={() => setSelectedAgentId(ag.id)}
            className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
              selectedAgentId === ag.id
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border bg-card hover:bg-muted/50 text-muted-foreground'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <Bot className={`h-4 w-4 ${selectedAgentId === ag.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-medium">
                {ag.category}
              </Badge>
            </div>
            <p className="text-xs font-bold text-foreground mt-2 truncate w-full">{ag.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 truncate w-full">{ag.role}</p>
          </button>
        ))}
      </div>

      {/* 2-Column Split: Settings Form (Left) & Realtime Simulator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: AGENT CONTROLS */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                <span>{activeAgent.name} Configuration</span>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                  Active Engine
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">{activeAgent.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              {/* Persona / Tone Selector */}
              <div>
                <Label className="text-xs font-semibold">Speaking Persona & Tone</Label>
                <select
                  value={activeAgent.persona}
                  onChange={(e) => updateActiveAgent('persona', e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-sm focus-visible:outline-none"
                >
                  <option value="Friendly Hinglish Consultant">Friendly Hinglish Consultant (Best for Indian WhatsApp)</option>
                  <option value="Aggressive Closer">Aggressive Closer (Fast urgency & payment links)</option>
                  <option value="Polite Professional">Polite Professional (Doctor / Legal / Formal)</option>
                  <option value="Fast Support">Fast Support (Direct answers, no sales fluff)</option>
                </select>
              </div>

              {/* Goal / Target */}
              <div>
                <Label className="text-xs font-semibold">Primary Sales Goal</Label>
                <Input
                  value={activeAgent.goal}
                  onChange={(e) => updateActiveAgent('goal', e.target.value)}
                  placeholder="e.g. Get customer to request quotation or book site visit"
                  className="mt-1 h-9 rounded-xl text-xs"
                />
              </div>

              {/* Discount Limit Slider */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold">Max Allowed Discount Limit</Label>
                  <span className="text-xs font-bold text-emerald-500">{activeAgent.maxDiscount}% Max Discount</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={activeAgent.maxDiscount}
                  onChange={(e) => updateActiveAgent('maxDiscount', Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500 cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  The AI will never offer more than {activeAgent.maxDiscount}% discount even if the customer negotiates aggressively.
                </p>
              </div>

              {/* Custom Instructions */}
              <div>
                <Label className="text-xs font-semibold">Custom AI Instructions (Plain English)</Label>
                <Textarea
                  rows={4}
                  value={activeAgent.customInstructions}
                  onChange={(e) => updateActiveAgent('customInstructions', e.target.value)}
                  placeholder="Tell the AI what to highlight, what words to avoid, or specific product features..."
                  className="mt-1 text-xs rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={handleSaveSettings}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold px-5 shadow-sm"
                >
                  Save Agent Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: LIVE TEST CHAT SIMULATOR */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-border bg-card shadow-sm flex flex-col h-[520px]">
            <CardHeader className="p-3.5 border-b border-border bg-muted/30 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <CardTitle className="text-xs font-bold text-foreground">
                    Live Roleplay Test Simulator
                  </CardTitle>
                </div>
                <button
                  type="button"
                  onClick={() => setTestMessages([])}
                  className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <RefreshCcw className="h-3 w-3" /> Clear Chat
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Testing active agent: <strong className="text-foreground">{activeAgent.name}</strong>
              </p>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto p-3.5 space-y-2.5 text-xs">
              {testMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center p-4 text-muted-foreground text-xs">
                  Type a customer message below (e.g. &quot;Kya discount milega?&quot; or &quot;Site inspection book karo&quot;) to test the AI.
                </div>
              ) : (
                testMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-foreground border border-border rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-muted-foreground px-1 mt-0.5">
                      {msg.sender === 'user' ? 'Test Customer' : activeAgent.name}
                    </span>
                  </div>
                ))
              )}
              {isSimulating && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 p-2 rounded-xl w-fit">
                  <Sparkles className="h-3.5 w-3.5 animate-spin text-emerald-500" />
                  AI is crafting response...
                </div>
              )}
            </CardContent>

            {/* Chat Input */}
            <div className="p-2.5 border-t border-border bg-background shrink-0 flex items-center gap-2">
              <Input
                placeholder="Type customer message to test..."
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendTestMessage()}
                className="h-9 rounded-xl text-xs"
              />
              <Button
                size="sm"
                onClick={handleSendTestMessage}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 px-3 shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
