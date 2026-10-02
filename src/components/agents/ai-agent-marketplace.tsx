'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  Calendar,
  CreditCard,
  RefreshCcw,
  Mic,
  Star,
  CheckCircle2,
  Lock,
  Settings,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AgentCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isLocked: boolean;
  tier: 'Free' | 'Pro' | 'Add-on';
  isEnabled: boolean;
  defaultGoal: string;
}

export function AiAgentMarketplace() {
  const [agents, setAgents] = useState<AgentCard[]>([
    {
      id: '1',
      slug: 'sales_closer',
      title: 'Sales Closer Agent',
      description: 'Answers pricing queries, shows digital catalogs, and negotiates within your discount limits 24/7.',
      icon: ShoppingCart,
      isLocked: false,
      tier: 'Free',
      isEnabled: true,
      defaultGoal: 'Close orders and share payment links',
    },
    {
      id: '2',
      slug: 'booking_calendar',
      title: 'Smart Booking & Site Visit Agent',
      description: 'Checks open calendar slots and books doctor consultations, solar site visits, or coaching demos.',
      icon: Calendar,
      isLocked: false,
      tier: 'Free',
      isEnabled: true,
      defaultGoal: 'Confirm appointments and send calendar reminders',
    },
    {
      id: '3',
      slug: 'upi_payments',
      title: 'Dynamic UPI & Invoice Agent',
      description: 'Generates instant Razorpay UPI payment links in WhatsApp chat and sends automated PDF GST invoices.',
      icon: CreditCard,
      isLocked: false,
      tier: 'Pro',
      isEnabled: true,
      defaultGoal: 'Collect instant UPI advance and dispatch invoice',
    },
    {
      id: '4',
      slug: 'abandoned_recovery',
      title: '24h Abandoned Lead Recovery Agent',
      description: 'Re-engages dropped customer inquiries after 24 hours with a limited-time festive discount coupon.',
      icon: RefreshCcw,
      isLocked: false,
      tier: 'Pro',
      isEnabled: true,
      defaultGoal: 'Recover dropped leads with 10% discount',
    },
    {
      id: '5',
      slug: 'voice_notes',
      title: 'Hindi Voice Note Transcriber',
      description: 'Transcribes customer audio messages using Whisper AI and replies with respectful spoken Hinglish.',
      icon: Mic,
      isLocked: false,
      tier: 'Pro',
      isEnabled: true,
      defaultGoal: 'Understand voice notes and reply accurately',
    },
    {
      id: '6',
      slug: 'google_reviews',
      title: 'Google Review & Reputation Agent',
      description: 'Sends polite feedback requests and 5-star Google review links 48h after order delivery.',
      icon: Star,
      isLocked: false,
      tier: 'Add-on',
      isEnabled: false,
      defaultGoal: 'Collect 5-star Google business ratings',
    },
  ]);

  const [activeConfigAgent, setActiveConfigAgent] = useState<AgentCard | null>(null);
  const [welcomeMsg, setWelcomeMsg] = useState('Hello! Welcome to our store. How can I help you today?');
  const [maxDiscount, setMaxDiscount] = useState('10%');
  const [language, setLanguage] = useState('Hinglish (Natural Mix)');

  const toggleAgent = (slug: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.slug === slug ? { ...a, isEnabled: !a.isEnabled } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/40 p-4 rounded-xl border">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            1-Click AI Agent Marketplace
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Turn specialized 24/7 AI employees ON or OFF with a single tap. Zero coding required.
          </p>
        </div>
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1 text-xs w-fit">
          <Zap className="h-3.5 w-3.5 mr-1" />
          5 Agents Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <Card key={agent.slug} className={`relative flex flex-col justify-between transition-all hover:border-emerald-500/50 ${agent.isEnabled ? 'border-primary/40 bg-card' : 'opacity-85 bg-muted/20'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-2.5 rounded-lg ${agent.isEnabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={agent.tier === 'Free' ? 'secondary' : 'default'} className="text-[10px] uppercase font-bold tracking-wider">
                      {agent.tier}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-base font-semibold mt-3">{agent.title}</CardTitle>
                <CardDescription className="text-xs leading-relaxed line-clamp-2">
                  {agent.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between pt-3 border-t mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setActiveConfigAgent(agent)}
                  >
                    <Settings className="h-3.5 w-3.5 mr-1.5" />
                    Configure
                  </Button>

                  <Button
                    size="sm"
                    variant={agent.isEnabled ? 'default' : 'outline'}
                    className={`h-8 px-3 text-xs font-medium ${agent.isEnabled ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                    onClick={() => toggleAgent(agent.slug)}
                  >
                    {agent.isEnabled ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Active
                      </>
                    ) : (
                      'Enable Agent'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 3-Field Simple Configuration Dialog */}
      <Dialog open={!!activeConfigAgent} onOpenChange={(open) => !open && setActiveConfigAgent(null)}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-emerald-500" />
              Configure {activeConfigAgent?.title}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Simple 3-field setup. Changes take effect on WhatsApp immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">1. Welcome Greeting Message</Label>
              <Input
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                className="text-xs"
                placeholder="Hello! Welcome to our store..."
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">2. Maximum Allowed Discount</Label>
              <Input
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value)}
                className="text-xs"
                placeholder="e.g. 10% Max"
              />
              <p className="text-[11px] text-muted-foreground">AI will never negotiate beyond this limit.</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">3. Primary Spoken Language</Label>
              <Input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs"
                placeholder="Hinglish / Hindi / English"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" size="sm" onClick={() => setActiveConfigAgent(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => {
                setActiveConfigAgent(null);
              }}
            >
              Save & Activate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
