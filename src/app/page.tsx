'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  DollarSign,
  TrendingUp,
  CreditCard,
  Mic,
  Brain,
  Sliders,
  Calendar,
  Star,
  Users,
  Building2,
  Sun,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Send,
  RefreshCcw,
  ChevronDown,
  Lock,
  PhoneCall,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LandingPage() {
  // Industry Demo Roleplay Selector
  const [selectedIndustry, setSelectedIndustry] = useState<'solar' | 'clinic' | 'coaching' | 'realestate' | 'retail'>('solar');

  // Interactive Live Chat Simulator State
  const [demoMessages, setDemoMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'user', text: 'Namaste, mujhe ghar ke liye 3kW solar rooftop lagwana hai. Kitna kharcha aayega?' },
    {
      sender: 'ai',
      text: 'Namaste! 🙏 Surya Solar me aapka swagat hai. 3kW Solar Rooftop system ka total cost approx ₹1,65,000 aata hai. Isme PM Surya Ghar Yojana ke tehat ₹78,000 seedha aapke bank account me DBT Subsidy aayegi, to aapka net kharcha sirf ₹87,000 rahega!\n\nKya aapki chhat par 300 sq.ft shadow-free jagah available hai? Humare engineer kal free site survey ke liye aa sakte hain.',
    },
  ]);
  const [demoInput, setDemoInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // ROI Calculator State
  const [dailyLeads, setDailyLeads] = useState(40);
  const avgOrderValue = 15000;
  const estimatedExtraSales = Math.round((dailyLeads * 30 * 0.12 * avgOrderValue) / 1000); // 12% extra conversion in thousands

  // Handle live test chat simulation
  const handleSendDemoMessage = () => {
    if (!demoInput.trim()) return;
    const userMsg = demoInput;
    setDemoMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setDemoInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('discount') || lower.includes('kam') || lower.includes('offer')) {
        reply = 'Sir, agar aap aaj apna slot hold karte hain, to hum special festival discount ke sath ₹5,000 ka extra cashback voucher de rahe hain! Kya main aapka ₹999 refundable token link bhej doon?';
      } else if (lower.includes('site') || lower.includes('survey') || lower.includes('book') || lower.includes('visit')) {
        reply = 'Bilkul! Humare certified solar engineer kal dopahar 12:00 PM ya sham 4:00 PM par visit kar sakte hain. Kripya apna address confirm kijiye.';
      } else if (lower.includes('pay') || lower.includes('upi') || lower.includes('link') || lower.includes('token')) {
        reply = 'Ye lijiye aapka secure UPI booking link: https://rzp.io/l/solar-token-999. Pay karne ke baad screenshot bhejne ki zarurat nahi hai, system automatically confirm kar lega! 🎉';
      } else {
        reply = 'Ji bilkul! Iske bare me humare paas complete details hain. Aapka monthly electricity bill lagbhag kitna aata hai, taaki hum exact capacity calculate kar sakein?';
      }

      setDemoMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 850);
  };

  // Switch demo industry
  const switchIndustry = (ind: 'solar' | 'clinic' | 'coaching' | 'realestate' | 'retail') => {
    setSelectedIndustry(ind);
    if (ind === 'solar') {
      setDemoMessages([
        { sender: 'user', text: 'Hi, 3kW solar ka quote chahiye.' },
        {
          sender: 'ai',
          text: 'Namaste! 🙏 3kW system par ₹78,000 Govt Subsidy ke baad net cost sirf ₹87,000 aayegi. Har mahine ₹3,500 tak bill bachega! Kya kal free site visit schedule karein?',
        },
      ]);
    } else if (ind === 'clinic') {
      setDemoMessages([
        { sender: 'user', text: 'Doctor sahab ka Sunday OPD timing kya hai?' },
        {
          sender: 'ai',
          text: 'Namaste! 🩺 Dr. Sharma Sunday ko subah 10:00 AM se 1:00 PM tak available hain. Appointments limited hain. Kya main aapke liye 11:30 AM ka slot book kar doon?',
        },
      ]);
    } else if (ind === 'coaching') {
      setDemoMessages([
        { sender: 'user', text: 'JEE Dropper batch ki fees kitni hai?' },
        {
          sender: 'ai',
          text: 'Hello! 🎓 Apex Academy ke JEE 2027 Dropper batch ki annual fees ₹65,000 hai (Printed Books + All India Test Series included). Top 50 students ke liye 20% scholarship test kal hai. Kya aap register karna chahte hain?',
        },
      ]);
    } else if (ind === 'realestate') {
      setDemoMessages([
        { sender: 'user', text: '3 BHK flat in Prime City ka brochure bhejo.' },
        {
          sender: 'ai',
          text: 'Namaste! 🏢 Prime Grandeur me 3 BHK luxury apartments ₹72 Lakh se start hain (Clubhouse + 2 Car Parking). Brochure download link: https://vismart.cloud/brochure/prime-3bhk.pdf. Kya aap weekend par sample flat visit karna chahenge?',
        },
      ]);
    } else {
      setDemoMessages([
        { sender: 'user', text: 'Sony 55 inch 4K TV available hai?' },
        {
          sender: 'ai',
          text: 'Ji haan! 📺 Sony Bravia 55" 4K Google TV stock me available hai. Market price ₹58,990 hai, par aaj hamare store par exclusive festive deal me ₹52,490 + No Cost EMI mil rahi hai. Kya main booking link share kar doon?',
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-4 py-2 text-center text-xs font-semibold text-white">
        <span>⚡ Launch Special Offer: Get Your Full Autonomous 24/7 AI Sales Employee for just ₹99 (7-Day Risk-Free Trial)</span>
        <Link href="/pay/trial" className="ml-2 underline hover:text-emerald-100">
          Claim ₹99 Trial →
        </Link>
      </div>

      {/* 2. NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-foreground sm:text-lg leading-tight">
                Vismart <span className="text-emerald-500">AI</span>
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                Sales Employee SaaS
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#demo" className="transition-colors hover:text-foreground">
              Live Roleplay Demo
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Superpowers
            </a>
            <a href="#industries" className="transition-colors hover:text-foreground">
              Industries
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#calculator" className="transition-colors hover:text-foreground">
              ROI Calculator
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Sign In
            </Link>
            <Button
              render={<Link href="/pay/trial" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              Start ₹99 Trial ⚡
            </Button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 h-[250px] w-[350px] rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Autonomous WhatsApp AI Sales Employee • Zero Human Staff Needed
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Hire a 24/7 WhatsApp <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">AI Sales Employee</span> That Closes Deals While You Sleep.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Forget basic Q&amp;A bots. This is an autonomous closer that speaks fluent Hinglish, remembers customer history, negotiates within discount limits, and collects instant UPI advances 24/7.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Button
                size="lg"
                render={<Link href="/pay/trial" />}
                className="w-full sm:w-auto h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-base font-bold shadow-xl shadow-emerald-500/25 active:scale-95 transition-all gap-2"
              >
                Start 7-Day Trial for ₹99 <ArrowRight className="h-4 w-4" />
              </Button>

              <a
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 rounded-xl border border-border bg-card/80 hover:bg-muted font-semibold text-sm transition-all"
              >
                <MessageSquare className="h-4 w-4 mr-2 text-emerald-500" />
                Test Live WhatsApp Demo
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Official Cloud API (No Ban)
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="h-4 w-4 text-emerald-500" /> Razorpay UPI AutoPay
              </span>
              <span className="flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-emerald-500" /> Human-in-Loop Approval Radar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE LIVE WHATSAPP ROLEPLAY DEMO (SECTION #demo) */}
      <section id="demo" className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
              Interactive Test Chamber
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
              Experience Your AI Sales Employee Live
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Select your business industry below and chat with the AI in real time right in your browser.
            </p>
          </div>

          {/* Industry Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'solar', label: '☀️ Solar Rooftop Solutions', icon: Sun },
              { id: 'clinic', label: '🏥 Doctor & Dental Clinic', icon: Stethoscope },
              { id: 'coaching', label: '📚 JEE & NEET Coaching', icon: GraduationCap },
              { id: 'realestate', label: '🏢 Real Estate & Plots', icon: Building2 },
              { id: 'retail', label: '🛍️ Electronics & Retail', icon: ShoppingBag },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => switchIndustry(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedIndustry === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-card border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Chat Mockup Simulator */}
          <div className="max-w-xl mx-auto rounded-3xl border border-border/80 bg-background shadow-2xl overflow-hidden flex flex-col h-[520px]">
            {/* WhatsApp Header */}
            <div className="bg-emerald-700 dark:bg-emerald-950 px-4 py-3 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold">
                  <Bot className="h-5 w-5" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">Vismart AI Sales Employee</p>
                  <p className="text-[10px] text-emerald-200">Online 24/7 • Fast ₹999 Token Closer</p>
                </div>
              </div>
              <Badge className="bg-emerald-600 text-white text-[10px] border-none">
                Live Simulator
              </Badge>
            </div>

            {/* Chat Conversation Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20 text-xs">
              {demoMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-card text-foreground border border-border/70 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-muted-foreground px-1 mt-0.5">
                    {msg.sender === 'user' ? 'You (Customer)' : 'AI Sales Closer'}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card border border-border p-2.5 rounded-2xl w-fit">
                  <Sparkles className="h-3.5 w-3.5 animate-spin text-emerald-500" />
                  AI is calculating best offer &amp; reply...
                </div>
              )}
            </div>

            {/* Quick Test Prompt Chips */}
            <div className="px-3 py-1.5 bg-muted/50 border-t border-border/50 flex gap-1.5 overflow-x-auto text-[10px]">
              <span className="text-muted-foreground shrink-0 py-0.5">Try asking:</span>
              <button
                type="button"
                onClick={() => setDemoInput('Kuch discount ya cashback offer milega?')}
                className="bg-card border border-border px-2 py-0.5 rounded-md text-foreground hover:bg-muted shrink-0"
              >
                &quot;Discount milega?&quot;
              </button>
              <button
                type="button"
                onClick={() => setDemoInput('Site visit kab schedule kar sakte hain?')}
                className="bg-card border border-border px-2 py-0.5 rounded-md text-foreground hover:bg-muted shrink-0"
              >
                &quot;Site visit book karo&quot;
              </button>
              <button
                type="button"
                onClick={() => setDemoInput('Advance pay karne ka UPI link bhejo')}
                className="bg-card border border-border px-2 py-0.5 rounded-md text-foreground hover:bg-muted shrink-0"
              >
                &quot;UPI link bhejo&quot;
              </button>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-border bg-card shrink-0 flex items-center gap-2">
              <Input
                placeholder="Type customer message (e.g. Kya discount milega?)..."
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendDemoMessage()}
                className="h-10 rounded-xl text-xs"
              />
              <Button
                onClick={handleSendDemoMessage}
                className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIX CORE SUPERPOWERS (BENTO GRID) */}
      <section id="features" className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
              Autonomous Intelligence
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
              Why Traditional Chatbots Fail &amp; Vismart Wins
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Engineered specifically for Indian businesses to eliminate manual labor and convert inbound chats into paid bank orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Human-in-the-Loop Radar */}
            <Card className="border-border bg-card/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 mb-2">
                  <Brain className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-bold">
                  Human-in-the-Loop AI Brain Radar
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  AI extracts new pricing &amp; timing rules from your chats, but <strong className="text-foreground">never sets any rule live without your 1-click approval</strong>. Zero hallucinations guaranteed.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 2: Daily Voice Interviewer */}
            <Card className="border-border bg-card/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mb-2">
                  <Mic className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-bold">
                  Daily 8 PM WhatsApp Voice Interviewer
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  No confusing dashboard forms! AI asks you 3 quick questions on WhatsApp daily via voice notes to learn today&apos;s stock, prices, and offers.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 3: Dynamic Razorpay UPI Links */}
            <Card className="border-border bg-card/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 mb-2">
                  <CreditCard className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-bold">
                  Dynamic UPI Payment Links in Chat
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Generates instant ₹999 booking token links or full invoice UPI links directly inside the WhatsApp conversation with webhook auto-confirmation.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 4: 1-Click AI Agent Marketplace */}
            <Card className="border-border bg-card/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center border border-teal-500/20 mb-2">
                  <Sliders className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-bold">
                  App-Store Style 1-Click Agent Toggles
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Toggle on specialized AI agents: Sales Closer, Doctor Booking, 24h Abandoned Lead Recovery, Hindi Voice Note Transcriber, and Review Collector.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 5: Infinite Episodic Memory */}
            <Card className="border-border bg-card/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 mb-2">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-bold">
                  Infinite Long-Term Customer Memory
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Vector database remembers what customer discussed 3 months ago: their roof size, previous purchases, budget, and future expansion signals.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 6: Zero-Ban Official Meta API */}
            <Card className="border-border bg-card/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mb-2">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-bold">
                  Official Meta Cloud API (Zero Ban)
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  100% compliant with WhatsApp Business Cloud API. Your business number will never be banned unlike unofficial scraper tools.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE ROI REVENUE CALCULATOR (SECTION #calculator) */}
      <section id="calculator" className="py-16 bg-muted/40 border-y border-border">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <Card className="border-border bg-card/90 shadow-xl rounded-3xl p-6 sm:p-8">
            <div className="text-center space-y-2 mb-8">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
                Revenue Growth Calculator
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                How Much Extra Money Will Your AI Sales Closer Make?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Calculate the revenue recovered from night inquiries (8 PM - 9 AM) and automated 24h discount follow-ups.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 text-sm font-semibold">
                  <span>Inbound WhatsApp Inquiries Per Day:</span>
                  <span className="text-emerald-500 font-bold text-base">{dailyLeads} Inquiries/Day</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={dailyLeads}
                  onChange={(e) => setDailyLeads(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>10 Leads</span>
                  <span>100 Leads</span>
                  <span>200 Leads/Day</span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-2">
                <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                  Estimated Extra Monthly Revenue Closed by AI
                </p>
                <p className="text-3xl sm:text-5xl font-black text-foreground">
                  ₹{estimatedExtraSales.toLocaleString()},000
                  <span className="text-sm sm:text-base font-normal text-muted-foreground"> /month</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on standard 12% additional closing rate from instant 24/7 replies and automated Razorpay UPI links.
                </p>
              </div>

              <div className="text-center pt-2">
                <Button
                  size="lg"
                  render={<Link href="/pay/trial" />}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold px-8 shadow-lg shadow-emerald-500/20"
                >
                  Start ₹99 Trial &amp; Recover Your Leads ⚡
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 7. TRANSPARENT PRICING GRID (SECTION #pricing) */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
              Simple &amp; Transparent Plans
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
              Invest in an AI Employee for 1/10th the Cost of a Human
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              No salary, no holidays, no commission disputes. Starts at just ₹99 for a full 7-day test.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* PLAN 1: 7-DAY TRIAL */}
            <Card className="border-border bg-card/60 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div>
                <Badge variant="outline" className="text-xs font-semibold mb-3">
                  7-Day Risk-Free Trial
                </Badge>
                <CardTitle className="text-xl font-bold">Starter Test Drive</CardTitle>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">₹99</span>
                  <span className="text-xs text-muted-foreground">for 7 days</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Test your AI Sales Closer on your own WhatsApp number with full features.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-muted-foreground border-t border-border pt-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>1 Active AI Sales Closer Agent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Daily 8 PM Voice Interviewer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Razorpay UPI Payment Link Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Human-in-the-Loop Approval Radar</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  render={<Link href="/pay/trial" />}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2.5"
                >
                  Start ₹99 Trial Now
                </Button>
              </div>
            </Card>

            {/* PLAN 2: PRO AI CLOSER (FEATURED) */}
            <Card className="border-2 border-emerald-500 bg-card rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md">
                Most Popular for Indian SMBs
              </div>

              <div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-xs font-semibold mb-3">
                  Monthly Growth
                </Badge>
                <CardTitle className="text-xl font-bold">Pro AI Sales Closer</CardTitle>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">₹1,499</span>
                  <span className="text-xs text-muted-foreground">/month (AutoPay)</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Complete autonomous sales suite for active shops, clinics, and solar installers.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-foreground/90 border-t border-border pt-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span><strong>Unlimited</strong> AI Sales &amp; Booking Agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>24h Abandoned Lead Recovery Bot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Hindi Voice Note Transcription &amp; Reply</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Custom Discount Negotiation Slider</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Unlimited WhatsApp Contacts &amp; Broadcasts</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  render={<Link href="/pay/trial" />}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2.5 shadow-lg shadow-emerald-500/20"
                >
                  Activate Pro via ₹99 Trial
                </Button>
              </div>
            </Card>

            {/* PLAN 3: ENTERPRISE VIP */}
            <Card className="border-border bg-card/60 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div>
                <Badge variant="outline" className="text-xs font-semibold mb-3">
                  Custom Multi-Branch
                </Badge>
                <CardTitle className="text-xl font-bold">Enterprise VIP</CardTitle>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">₹3,999</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  For coaching franchises, multi-doctor hospitals, and real estate developer firms.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-muted-foreground border-t border-border pt-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Multi-Branch Number Routing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Dedicated Relationship Manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Custom ERP / CRM Webhook Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Zero Transaction Commission Rate</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  render={<Link href="/pay/trial" />}
                  variant="outline"
                  className="w-full rounded-xl text-xs font-bold py-2.5"
                >
                  Contact Enterprise Team
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-border bg-card/50 py-12 text-xs text-muted-foreground">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-foreground">Vismart AI Sales Suite</p>
              <p className="text-[10px]">Autonomous 24/7 WhatsApp AI Employee &amp; CRM Platform</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/login" className="hover:text-foreground">Sign In to Dashboard</Link>
            <Link href="/pay/trial" className="hover:text-foreground">₹99 Trial Checkout</Link>
            <a href="#demo" className="hover:text-foreground">Live Roleplay Demo</a>
            <a href="#features" className="hover:text-foreground">AI Brain Radar</a>
          </div>

          <p className="text-[11px]">
            &copy; {new Date().getFullYear()} Vismart AI Suite. All rights reserved. Built with Official Meta Cloud API.
          </p>
        </div>
      </footer>
    </div>
  );
}
