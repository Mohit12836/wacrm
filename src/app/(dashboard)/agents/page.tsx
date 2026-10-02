'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bot, Sparkles, Settings2, BarChart3, QrCode, LayoutGrid } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AiPlayground } from '@/components/agents/ai-playground';
import { AiUsageCard } from '@/components/agents/ai-usage';
import { AiConfig } from '@/components/settings/ai-config';
import { QrWhatsAppConnect } from '@/components/settings/qr-whatsapp-connect';
import { AiAgentMarketplace } from '@/components/agents/ai-agent-marketplace';
import { useAuth } from '@/hooks/use-auth';
import { canEditSettings } from '@/lib/auth/roles';

type Tab = 'marketplace' | 'playground' | 'setup' | 'qr_connect' | 'usage';

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
    <div>
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          AI Employee & Agents Hub
        </h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your autonomous 24/7 AI salesmen, booking assistants, and payment closers.
      </p>

      {decided && (
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as Tab)}
          className="mt-6"
        >
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="marketplace" className="text-emerald-500 data-[state=active]:text-emerald-500 font-semibold">
              <LayoutGrid className="mr-1.5 h-4 w-4" /> AI Agent Store
            </TabsTrigger>
            <TabsTrigger value="playground">
              <Sparkles className="mr-1.5 h-4 w-4" /> {t('tabPlayground')}
            </TabsTrigger>
            <TabsTrigger value="setup">
              <Settings2 className="mr-1.5 h-4 w-4" /> {t('tabSetup')}
            </TabsTrigger>
            <TabsTrigger value="qr_connect" className="text-emerald-500 data-[state=active]:text-emerald-500">
              <QrCode className="mr-1.5 h-4 w-4" /> QR WhatsApp Connect (Free)
            </TabsTrigger>
            {canViewUsage && (
              <TabsTrigger value="usage">
                <BarChart3 className="mr-1.5 h-4 w-4" /> {t('tabUsage')}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="marketplace" className="mt-4">
            <AiAgentMarketplace />
          </TabsContent>

          <TabsContent value="playground" className="mt-4">
            <AiPlayground onGoToSetup={() => setTab('setup')} />
          </TabsContent>

          <TabsContent value="setup" className="mt-4">
            <AiConfig />
          </TabsContent>

          <TabsContent value="qr_connect" className="mt-4">
            <QrWhatsAppConnect />
          </TabsContent>

          {canViewUsage && (
            <TabsContent value="usage" className="mt-4">
              <AiUsageCard />
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
}
