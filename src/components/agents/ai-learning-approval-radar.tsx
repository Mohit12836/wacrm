'use client';

import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  Edit3,
  Sparkles,
  ShieldCheck,
  Clock,
  Mic,
  MessageSquare,
  Plus,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
  Send,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface StagedRule {
  id: string;
  source: 'whatsapp_chat' | 'daily_interview' | 'voice_note';
  sourceDetail: string;
  category: 'Pricing & Discount' | 'Product Specification' | 'Timing & Availability' | 'Policy & Guarantee';
  extractedRule: string;
  originalText: string;
  confidence: number;
  timestamp: string;
}

interface ApprovedKnowledge {
  id: string;
  category: string;
  ruleTitle: string;
  ruleDetail: string;
  approvedAt: string;
  status: 'active' | 'paused';
}

export function AiLearningApprovalRadar() {
  // Staged rules extracted by AI from chats / interviews waiting for Owner's 1-click approval
  const [stagedRules, setStagedRules] = useState<StagedRule[]>([
    {
      id: 'stg_1',
      source: 'whatsapp_chat',
      sourceDetail: 'Chat with Customer (+91 98260 11223)',
      category: 'Pricing & Discount',
      extractedRule: 'For 5kW Solar Rooftop systems, provide an additional ₹5,000 cash discount if payment is completed in 24 hours.',
      originalText: 'Owner told client: "Agar aap kal tak final karoge to 5kW inverter pe 5000 alag se discount dunga"',
      confidence: 96,
      timestamp: 'Today, 4:15 PM',
    },
    {
      id: 'stg_2',
      source: 'daily_interview',
      sourceDetail: '8:00 PM WhatsApp Daily Voice Interview',
      category: 'Timing & Availability',
      extractedRule: 'Sunday clinic consultations are strictly by prior appointment between 10:00 AM to 1:00 PM only.',
      originalText: 'Voice Note: "Sunday ko main sirf subah 10 se 1 baje baithta hu aur bina booking kisi ko nahi dekhta"',
      confidence: 98,
      timestamp: 'Yesterday, 8:02 PM',
    },
    {
      id: 'stg_3',
      source: 'voice_note',
      sourceDetail: 'Audio note from +91 94250 88776',
      category: 'Policy & Guarantee',
      extractedRule: 'JEE Crash Course admission fee of ₹8,000 includes all printed module study materials and test series.',
      originalText: 'Audio Transcription: "Crash course me ₹8000 me saari test series aur printed books shamil hai"',
      confidence: 94,
      timestamp: 'Today, 2:30 PM',
    },
  ]);

  // Approved Knowledge Base that AI is actively using right now
  const [activeKnowledge, setActiveKnowledge] = useState<ApprovedKnowledge[]>([
    {
      id: 'knw_1',
      category: 'Pricing & Discount',
      ruleTitle: 'Maximum Festive Discount Limit',
      ruleDetail: 'AI is authorized to offer a maximum 10% discount to warm leads who have not purchased after 48 hours.',
      approvedAt: '2 days ago',
      status: 'active',
    },
    {
      id: 'knw_2',
      category: 'Product Specification',
      ruleTitle: 'Solar Subsidy Eligibility (PM Surya Ghar)',
      ruleDetail: 'All 3kW to 10kW residential rooftop installations qualify for government DBT subsidy up to ₹78,000.',
      approvedAt: '5 days ago',
      status: 'active',
    },
    {
      id: 'knw_3',
      category: 'Policy & Guarantee',
      ruleTitle: 'Refund & Advance Policy',
      ruleDetail: 'Advance token booking of ₹999 is 100% refundable if site inspection is not feasible.',
      approvedAt: '1 week ago',
      status: 'active',
    },
  ]);

  // Modal states for editing or adding rules
  const [editingRule, setEditingRule] = useState<StagedRule | null>(null);
  const [editText, setEditText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('Pricing & Discount');
  const [newTitle, setNewTitle] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [interviewTime, setInterviewTime] = useState('20:00');
  const [interviewPhone, setInterviewPhone] = useState('+91 98931 00000');
  const [interviewStatus, setInterviewStatus] = useState<'active' | 'paused'>('active');

  // Approve a staged rule
  const handleApprove = (rule: StagedRule) => {
    const newApproved: ApprovedKnowledge = {
      id: 'knw_' + Date.now(),
      category: rule.category,
      ruleTitle: rule.category + ' Rule',
      ruleDetail: rule.extractedRule,
      approvedAt: 'Just now',
      status: 'active',
    };
    setActiveKnowledge([newApproved, ...activeKnowledge]);
    setStagedRules(stagedRules.filter((r) => r.id !== rule.id));
  };

  // Reject / discard a staged rule
  const handleReject = (id: string) => {
    setStagedRules(stagedRules.filter((r) => r.id !== id));
  };

  // Save edited rule
  const handleSaveEdit = () => {
    if (!editingRule) return;
    const newApproved: ApprovedKnowledge = {
      id: 'knw_' + Date.now(),
      category: editingRule.category,
      ruleTitle: editingRule.category + ' (Customized)',
      ruleDetail: editText,
      approvedAt: 'Just now',
      status: 'active',
    };
    setActiveKnowledge([newApproved, ...activeKnowledge]);
    setStagedRules(stagedRules.filter((r) => r.id !== editingRule.id));
    setEditingRule(null);
  };

  // Add manual rule
  const handleAddManualRule = () => {
    if (!newTitle.trim() || !newDetail.trim()) return;
    const newApproved: ApprovedKnowledge = {
      id: 'knw_' + Date.now(),
      category: newCategory,
      ruleTitle: newTitle,
      ruleDetail: newDetail,
      approvedAt: 'Just now',
      status: 'active',
    };
    setActiveKnowledge([newApproved, ...activeKnowledge]);
    setNewTitle('');
    setNewDetail('');
    setIsAddModalOpen(false);
  };

  const filteredKnowledge = activeKnowledge.filter(
    (k) =>
      k.ruleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.ruleDetail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Explanation of Human-In-The-Loop Safety */}
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-background to-primary/5 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                Human-in-the-Loop AI Brain & Approval Radar
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] font-semibold">
                  Zero Hallucination Shield
                </Badge>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The AI listens to customer chats and daily WhatsApp audio interviews to learn new business rules. 
                <strong className="text-foreground"> It will NEVER apply any rule live until YOU approve it below.</strong>
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md gap-1.5 text-xs font-semibold"
          >
            <Plus className="h-4 w-4" />
            Add Custom Business Rule
          </Button>
        </div>
      </div>

      {/* SECTION 1: STAGED RULES AWAITING OWNER APPROVAL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-amber-500 animate-pulse" />
            <h3 className="text-base font-bold text-foreground">
              Pending Rules Awaiting Your Approval ({stagedRules.length})
            </h3>
          </div>
          <span className="text-xs text-muted-foreground">
            Extracted from recent WhatsApp interactions
          </span>
        </div>

        {stagedRules.length === 0 ? (
          <Card className="border-dashed border-border bg-card/50 text-center py-8">
            <CardContent>
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-semibold text-foreground">All Learned Rules Approved!</p>
              <p className="text-xs text-muted-foreground mt-1">
                AI is running with 100% verified knowledge. New insights from daily chats will appear here automatically.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {stagedRules.map((rule) => (
              <Card
                key={rule.id}
                className="border border-amber-500/30 bg-amber-500/[0.02] dark:bg-amber-500/[0.04] transition-all hover:border-amber-500/50 shadow-sm"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="border-amber-500/40 text-amber-500 bg-amber-500/10 text-xs font-medium">
                          {rule.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {rule.timestamp}
                        </span>
                        <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          AI Confidence: {rule.confidence}%
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground leading-snug">
                          {rule.extractedRule}
                        </p>
                        <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg italic">
                          <strong className="text-foreground/80 not-italic">Source:</strong> &quot;{rule.originalText}&quot; — <span className="text-primary">{rule.sourceDetail}</span>
                        </p>
                      </div>
                    </div>

                    {/* 3 Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 md:self-center">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(rule)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold gap-1.5 shadow-sm active:scale-95"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve Rule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingRule(rule);
                          setEditText(rule.extractedRule);
                        }}
                        className="rounded-xl text-xs font-medium gap-1 hover:bg-muted"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleReject(rule.id)}
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl text-xs"
                      >
                        <XCircle className="h-4 w-4" />
                        Discard
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: DAILY WHATSAPP INTERVIEWER CONFIG */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Mic className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-base font-bold">
                  Daily WhatsApp Audio Interviewer
                </CardTitle>
                <CardDescription className="text-xs">
                  AI will ping your WhatsApp number daily to ask 3 quick questions about offers, stock, and new policies.
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className={interviewStatus === 'active' ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10' : 'border-border text-muted-foreground'}
            >
              {interviewStatus === 'active' ? '● Interviewer Scheduled' : 'Paused'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Interview Scheduled Time</Label>
              <Input
                type="time"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="mt-1 h-9 rounded-xl text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Owner WhatsApp Number</Label>
              <Input
                type="text"
                value={interviewPhone}
                onChange={(e) => setInterviewPhone(e.target.value)}
                className="mt-1 h-9 rounded-xl text-xs"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant={interviewStatus === 'active' ? 'outline' : 'default'}
                onClick={() => setInterviewStatus(interviewStatus === 'active' ? 'paused' : 'active')}
                className="w-full h-9 rounded-xl text-xs font-semibold"
              >
                {interviewStatus === 'active' ? 'Pause Interviewer' : 'Activate Interviewer'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3: ACTIVE APPROVED KNOWLEDGE BASE */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <h3 className="text-base font-bold text-foreground">
              Active AI Brain Knowledge Base ({filteredKnowledge.length})
            </h3>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search approved rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredKnowledge.map((item) => (
            <Card key={item.id} className="border-border bg-card/80 hover:bg-card transition-all">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px] font-medium">
                    {item.category}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    Approved {item.approvedAt}
                  </span>
                </div>
                <CardTitle className="text-sm font-bold pt-1.5 line-clamp-1">
                  {item.ruleTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {item.ruleDetail}
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/50 text-[11px]">
                  <span className="text-emerald-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Live in AI Brain
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveKnowledge(activeKnowledge.filter((k) => k.id !== item.id))}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* MODAL: Edit Staged Rule */}
      <Dialog open={!!editingRule} onOpenChange={(open) => !open && setEditingRule(null)}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Edit Rule Before Approving</DialogTitle>
            <DialogDescription className="text-xs">
              Modify the exact rule wording before injecting it into the AI Sales Employee knowledge engine.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label className="text-xs">Category</Label>
              <p className="text-xs font-semibold text-primary">{editingRule?.category}</p>
            </div>
            <div>
              <Label className="text-xs">Rule Text for AI Brain</Label>
              <Textarea
                rows={4}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditingRule(null)} className="rounded-xl">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              Save & Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Add Custom Rule */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Custom Business Rule</DialogTitle>
            <DialogDescription className="text-xs">
              Directly instruct the AI on your custom offers, prices, or policies in plain simple English/Hinglish.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label className="text-xs">Category</Label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-sm focus-visible:outline-none"
              >
                <option value="Pricing & Discount">Pricing & Discount</option>
                <option value="Product Specification">Product Specification</option>
                <option value="Timing & Availability">Timing & Availability</option>
                <option value="Policy & Guarantee">Policy & Guarantee</option>
              </select>
            </div>
            <div>
              <Label className="text-xs">Rule Title</Label>
              <Input
                placeholder="e.g. Free Home Visit in 5km Radius"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="mt-1 h-9 rounded-xl text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Exact Instruction for AI</Label>
              <Textarea
                rows={3}
                placeholder="e.g. Tell customers that site inspection is completely free within 5km of our showroom."
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button size="sm" onClick={handleAddManualRule} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              Add to AI Brain
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
