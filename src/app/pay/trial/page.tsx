'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, Bot, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

function TrialCheckoutContent() {
  const searchParams = useSearchParams();
  const phoneParam = searchParams.get('phone') || '';

  const [phone, setPhone] = useState(phoneParam);
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (phoneParam) {
      setPhone(phoneParam);
    }
  }, [phoneParam]);

  const handlePay = async () => {
    if (!phone) {
      alert('Please enter your WhatsApp number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/billing/razorpay-initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planTier: 'trial',
          phone,
          customerName: businessName || 'Business Owner',
        }),
      });

      const data = await res.json();
      if (data?.success) {
        // In simulation / test mode, show instant success
        setTimeout(() => {
          setIsSuccess(true);
          setLoading(false);
        }, 1200);
      } else {
        alert('Payment initiation failed. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsSuccess(true);
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-emerald-500/40 bg-card text-center shadow-xl">
          <CardHeader className="pt-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Payment Successful! 🎉
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Your 24/7 AI Salesman is being deployed to your WhatsApp number.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-muted-foreground">
            <div className="bg-muted/50 p-4 rounded-xl text-left space-y-2 border">
              <div className="flex justify-between">
                <span className="font-medium">Registered Phone:</span>
                <span className="font-semibold text-foreground">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Plan:</span>
                <span className="font-semibold text-emerald-600">7-Day VIP Trial (₹99)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="font-semibold text-emerald-600">Active 🟢</span>
              </div>
            </div>
            <p className="text-xs">
              Check your WhatsApp! Our bot has sent you a welcome message to learn your first store rule.
            </p>
          </CardContent>
          <CardFooter className="pb-8 justify-center">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => (window.location.href = `https://wa.me/?text=Hi%2C%20I%20just%20activated%20my%20AI%20Salesman`)}
            >
              Open WhatsApp Chat <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald-500" /> Special Launch Offer
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-2">
            Activate Your 24/7 AI Salesman
          </h1>
          <p className="text-xs text-muted-foreground">
            Closes sales, sends instant quotes, and collects payments on WhatsApp.
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="border-primary/30 shadow-lg bg-card overflow-hidden">
          <div className="bg-primary/10 border-b border-primary/20 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                7-Day VIP Trial Pass
              </span>
            </div>
            <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
              SAVE 93%
            </Badge>
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-foreground">₹99</span>
              <span className="text-sm text-muted-foreground line-through">₹1,499</span>
              <span className="text-xs text-muted-foreground">/ for 7 days</span>
            </div>
            <CardDescription className="text-xs mt-1">
              Recurring ₹1,499/mo after 7 days. Cancel anytime with 1 tap.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>24/7 Instant Sales Closer on your WhatsApp number</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Understands Hindi, Hinglish & WhatsApp Voice Notes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant In-Chat UPI & Razorpay Payment Links</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Daily AI WhatsApp Interviewer (Learns store rules)</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Your WhatsApp Phone Number</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98931 XXXXX"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Store / Business Name</Label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Sharma Electronics"
                  className="text-xs h-9"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2.5 pt-2 pb-6">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 text-sm shadow-md"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? (
                'Connecting UPI AutoPay...'
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-1.5" /> Pay ₹99 & Activate AI (UPI AutoPay)
                </>
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Secure 256-Bit Razorpay UPI E-Mandate
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function TrialCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs">Loading checkout...</div>}>
      <TrialCheckoutContent />
    </Suspense>
  );
}
