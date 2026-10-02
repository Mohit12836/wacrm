'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bot, Sparkles, Settings2, BarChart3, QrCode, LayoutGrid, Brain, Sliders } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AiPlayground } from '@/components/agents/ai-playground';
import { AiUsageCard } from '@/components/agents/ai-usage';
import { AiConfig } from '@/components/settings/ai-config';
import { QrWhatsAppConnect } from '@/components/settings/qr-whatsapp-connect';
import { AiAgentMarketplace } from '@/components/agents/ai-agent-marketplace';
import { AiLearningApprovalRadar } from '@/components/agents/ai-learning-approval-radar';
import { AiAgentDeepController } from '@/components/agents/ai-agent-deep-controller';
import { useAuth } from '@/hooks/use-auth';
import { canEditSettings } from '@/lib/auth/roles';

type Tab = 'marketplace' | 'radar' | 'controller' | 'playground' | 'setup' | 'qr_connect' | 'usage';

export default function AgentsPage() {
  const t = useTranslations('Agents');
  const { accountRole } = useAuth();
  const canViewUsage = accountRole ? canEditSettings(accountRole) : false;
  const [tab, setTab] = useState<Tab>('marketplace');
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    setDecided(true);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          AI Employee & Sales Brain Hub
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Control every single aspect of your AI: activate 24/7 sales bots, approve newly learned business rules, and customize discount boundaries.
      </p>

      {decided && (
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as Tab)}
          className="mt-6"
        >
          <TabsList className="flex flex-wrap h-auto gap-1.5 p-1 bg-muted/60 rounded-2xl border border-border">
            <TabsTrigger value="marketplace" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-emerald-500 font-semibold text-xs py-2 px-3">
              <LayoutGrid className="mr-1.5 h-4 w-4" /> AI Agent Store
            </TabsTrigger>
            <TabsTrigger value="radar" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-amber-500 font-semibold text-xs py-2 px-3">
              <Brain className="mr-1.5 h-4 w-4" /> AI Brain & Approval Radar
            </TabsTrigger>
            <TabsTrigger value="controller" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary font-semibold text-xs py-2 px-3">
              <Sliders className="mr-1.5 h-4 w-4" /> Agent Rules & Personality
            </TabsTrigger>
            <TabsTrigger value="playground" className="rounded-xl data-[state=active]:bg-background text-xs py-2 px-3">
              <Sparkles className="mr-1.5 h-4 w-4" /> {t('tabPlayground')}
            </TabsTrigger>
            <TabsTrigger value="setup" className="rounded-xl data-[state=active]:bg-background text-xs py-2 px-3">
              <Settings2 className="mr-1.5 h-4 w-4" /> {t('tabSetup')}
            </TabsTrigger>
            <TabsTrigger value="qr_connect" className="rounded-xl data-[state=active]:bg-background text-emerald-500 data-[state=active]:text-emerald-500 text-xs py-2 px-3">
              <QrCode className="mr-1.5 h-4 w-4" /> QR WhatsApp Connect
            </TabsTrigger>
            {canViewUsage && (
              <TabsTrigger value="usage" className="rounded-xl data-[state=active]:bg-background text-xs py-2 px-3">
                <BarChart3 className="mr-1.5 h-4 w-4" /> {t('tabUsage')}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="marketplace" className="mt-5">
            <AiAgentMarketplace />
          </TabsContent>

          <TabsContent value="radar" className="mt-5">
            <AiLearningApprovalRadar />
          </TabsContent>

          <TabsContent value="controller" className="mt-5">
            <AiAgentDeepController />
          </TabsContent>

          <TabsContent value="playground" className="mt-5">
            <AiPlayground onGoToSetup={() => setTab('setup')} />
          </TabsContent>

          <TabsContent value="setup" className="mt-5">
            <AiConfig />
          </TabsContent>

          <TabsContent value="qr_connect" className="mt-5">
            <QrWhatsAppConnect />
          </TabsContent>

          {canViewUsage && (
            <TabsContent value="usage" className="mt-5">
              <AiUsageCard />
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
}
