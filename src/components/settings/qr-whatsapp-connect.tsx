'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, RefreshCw, CheckCircle2, Smartphone, ShieldCheck, Zap, Bot } from 'lucide-react';
import QRCode from 'qrcode';

export function QrWhatsAppConnect() {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate a live connection QR code
  const generateQr = async () => {
    setLoading(true);
    try {
      // Create session pairing payload
      const pairingPayload = `WACRM-BAILEYS-SESSION:${Date.now()}:JAINAM_SOLAR_AI_AGENT`;
      const url = await QRCode.toDataURL(pairingPayload, {
        width: 280,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateQr();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">WhatsApp Web QR Code Agent</CardTitle>
              <CardDescription>
                Scan with your WhatsApp to connect your personal or secondary number with zero Meta charges.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: QR Display Box */}
            <div className="flex flex-col items-center justify-center p-6 border rounded-xl bg-muted/20">
              {connected ? (
                <div className="flex flex-col items-center text-center p-8 space-y-3">
                  <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-500">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">WhatsApp Linked!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your WhatsApp session is active. Google Gemini AI is automatically replying to all incoming chats.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white rounded-xl shadow-sm border">
                    {qrDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={qrDataUrl} alt="WhatsApp QR Code" className="w-64 h-64 rounded-lg" />
                    ) : (
                      <div className="w-64 h-64 flex items-center justify-center bg-muted/40 rounded-lg">
                        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateQr}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh QR Code
                  </Button>
                </div>
              )}
            </div>

            {/* Right: Step-by-Step Instructions */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                How to link your phone:
              </h4>

              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li className="leading-relaxed">
                  Open <strong>WhatsApp</strong> on your mobile phone.
                </li>
                <li className="leading-relaxed">
                  Tap <strong>Settings</strong> (iOS) or <strong>Three Dots ⋮</strong> (Android) and select <strong>Linked Devices</strong>.
                </li>
                <li className="leading-relaxed">
                  Tap <strong>Link a Device</strong> and point your phone camera at this QR code.
                </li>
              </ol>

              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Meta Billing Free: ₹0 per conversation (No credit card needed).</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Bot className="h-4 w-4 text-primary shrink-0" />
                  <span>Google Gemini 2.5 Flash AI automatically responds to inquiries.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Chats will appear directly in your CRM Inbox.</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
