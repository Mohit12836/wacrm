'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Sparkles,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Sliders,
  Gift,
  Clock,
  Eye,
  Send,
  CheckCircle2,
  Lock,
  Search,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

interface Tenant {
  id: string;
  name: string;
  ownerPhone: string;
  category: string;
  tier: 'Trial' | 'Starter' | 'Pro' | 'VIP';
  commissionRate: number; // in percentage, e.g. 2.5
  totalChatsToday: number;
  monthlyRevenue: string;
  status: 'active' | 'trial' | 'past_due' | 'paused';
}

export default function SuperAdminPage() {
  const { accountRole, profile } = useAuth();
  const isSuperAdmin = accountRole === 'owner' || profile?.email === 'mohit12836@gmail.com';

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'Sharma Electronics & Appliances',
      ownerPhone: '+91 98931 23456',
      category: 'Retail & Electronics',
      tier: 'Pro',
      commissionRate: 2.0,
      totalChatsToday: 142,
      monthlyRevenue: '₹2,40,000',
      status: 'active',
    },
    {
      id: '2',
      name: 'Apex NEET & JEE Academy',
      ownerPhone: '+91 98260 54321',
      category: 'Coaching Institute',
      tier: 'VIP',
      commissionRate: 4.0,
      totalChatsToday: 380,
      monthlyRevenue: '₹5,80,000',
      status: 'active',
    },
    {
      id: '3',
      name: 'Surya Solar Rooftop Solutions',
      ownerPhone: '+91 94250 99887',
      category: 'Solar Energy',
      tier: 'Pro',
      commissionRate: 1.5,
      totalChatsToday: 95,
      monthlyRevenue: '₹8,20,000',
      status: 'active',
    },
    {
      id: '4',
      name: 'Dr. Smile Dental & Implant Clinic',
      ownerPhone: '+91 97555 11223',
      category: 'Healthcare & Clinic',
      tier: 'Trial',
      commissionRate: 0.0,
      totalChatsToday: 48,
      monthlyRevenue: '₹65,000',
      status: 'trial',
    },
    {
      id: '5',
      name: 'Royal Prime Properties',
      ownerPhone: '+91 99810 44556',
      category: 'Real Estate',
      tier: 'VIP',
      commissionRate: 3.5,
      totalChatsToday: 210,
      monthlyRevenue: '₹14,50,000',
      status: 'active',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [editingCommission, setEditingCommission] = useState(2.0);
  const [globalCategory, setGlobalCategory] = useState('Coaching Institute');
  const [globalRuleText, setGlobalRuleText] = useState('');
  const [injectedSuccess, setInjectedSuccess] = useState(false);

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ownerPhone.includes(searchQuery) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateCommission = () => {
    if (!selectedTenant) return;
    setTenants((prev) =>
      prev.map((t) =>
        t.id === selectedTenant.id ? { ...t, commissionRate: editingCommission } : t
      )
    );
    setSelectedTenant(null);
  };

  const handleGlobalInject = () => {
    if (!globalRuleText.trim()) return;
    setInjectedSuccess(true);
    setTimeout(() => {
      setInjectedSuccess(false);
      setGlobalRuleText('');
    }, 2500);
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-6 border-border shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4">
            <Lock className="h-7 w-7" />
          </div>
          <CardTitle className="text-xl font-bold">Owner Access Required</CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground leading-relaxed">
            The SuperAdmin God-Mode Cockpit is reserved exclusively for the Master SaaS Owner. Your account does not have authorization for global tenant oversight.
          </CardDescription>
          <div className="mt-6 flex justify-center">
            <Button
              render={<Link href="/dashboard" />}
              className="rounded-xl font-semibold"
            >
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SuperAdmin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              SuperAdmin God-Mode Cockpit
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Master control center for all multi-tenant shops, commission rates, and global AI telemetry.
          </p>
        </div>
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1.5 text-xs font-semibold w-fit">
          <Zap className="h-3.5 w-3.5 mr-1 text-amber-500" />
          Master Authority Active
        </Badge>
      </div>

      {/* 4 Master Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Active Shops (Tenants)
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-[11px] text-emerald-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 inline" /> +18 shops joined this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              WhatsApp Messages Today
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,820</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              94.2% handled autonomously by AI
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Business GMV
            </CardTitle>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18.45 Lakh</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Transacted across all client shops
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-amber-500/30 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-amber-600 uppercase tracking-wider">
              Your Net Commission Earned
            </CardTitle>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">₹46,125</div>
            <p className="text-[11px] text-amber-600/80 mt-1">
              Automated 2.5% average split payout
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Global AI Rule Injection Studio */}
      <Card className="border-primary/20 bg-muted/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Global AI Rule Injection Studio
          </CardTitle>
          <CardDescription className="text-xs">
            Instantly inject proven sales closing formulas across an entire industry category at once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium">Target Category</label>
              <select
                value={globalCategory}
                onChange={(e) => setGlobalCategory(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="Coaching Institute">All Coaching Academies (32)</option>
                <option value="Solar Energy">All Solar Installers (28)</option>
                <option value="Healthcare & Clinic">All Dental/Health Clinics (24)</option>
                <option value="Real Estate">All Real Estate Dealers (18)</option>
                <option value="Retail & Electronics">All Retail Stores (22)</option>
              </select>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium">Master Business Rule to Inject</label>
              <div className="flex gap-2">
                <Input
                  value={globalRuleText}
                  onChange={(e) => setGlobalRuleText(e.target.value)}
                  placeholder="e.g. Always ask for target exam before quoting batch fees..."
                  className="text-xs h-9"
                />
                <Button
                  size="sm"
                  onClick={handleGlobalInject}
                  className="bg-primary hover:bg-primary/90 text-xs shrink-0"
                >
                  <Send className="h-3.5 w-3.5 mr-1" /> Inject Rule
                </Button>
              </div>
            </div>
          </div>
          {injectedSuccess && (
            <div className="text-xs font-medium text-emerald-600 bg-emerald-500/10 p-2 rounded border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Successfully injected master rule to all {globalCategory} shops!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tenant Management Table with Commission Sliders */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Tenant & Shop Management</CardTitle>
              <CardDescription className="text-xs">
                Adjust commission rates, gift features, and manage subscription lifecycles.
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shop, phone, category..."
                className="pl-8 text-xs h-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-y">
              <tr>
                <th className="py-2.5 px-4">Business / Owner</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Plan Tier</th>
                <th className="py-2.5 px-4">Commission</th>
                <th className="py-2.5 px-4">Chats Today</th>
                <th className="py-2.5 px-4">Monthly GMV</th>
                <th className="py-2.5 px-4 text-right">God-Mode Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-foreground">{tenant.name}</div>
                    <div className="text-[11px] text-muted-foreground">{tenant.ownerPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{tenant.category}</td>
                  <td className="py-3 px-4">
                    <Badge variant={tenant.tier === 'VIP' ? 'default' : tenant.tier === 'Pro' ? 'secondary' : 'outline'} className="text-[10px]">
                      {tenant.tier}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">
                    {tenant.commissionRate.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4">{tenant.totalChatsToday}</td>
                  <td className="py-3 px-4 font-medium">{tenant.monthlyRevenue}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-[11px]"
                        onClick={() => {
                          setSelectedTenant(tenant);
                          setEditingCommission(tenant.commissionRate);
                        }}
                      >
                        <Sliders className="h-3 w-3 mr-1" /> Set Rate
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px] text-amber-500 hover:text-amber-600">
                        <Gift className="h-3 w-3 mr-1" /> Gift AI
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Set Commission Modal */}
      <Dialog open={!!selectedTenant} onOpenChange={(open) => !open && setSelectedTenant(null)}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Sliders className="h-4 w-4 text-emerald-500" />
              Adjust Commission: {selectedTenant?.name}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Configure dynamic performance commission rate for this specific tenant.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Commission Percentage:</span>
                <span className="text-emerald-600 text-sm font-bold">{editingCommission.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="10.0"
                step="0.5"
                value={editingCommission}
                onChange={(e) => setEditingCommission(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0.0% (Free Trial)</span>
                <span>2.5% (Standard)</span>
                <span>10.0% (High Margin)</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setSelectedTenant(null)}>
              Cancel
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleUpdateCommission}>
              Save Commission Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
