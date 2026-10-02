'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Bot, Radio, GitBranch, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNavDock() {
  const pathname = usePathname();

  const navItems = [
    { href: '/inbox', label: 'Inbox', icon: MessageSquare },
    { href: '/agents', label: 'AI Agents', icon: Bot },
    { href: '/broadcasts', label: 'Broadcast', icon: Radio },
    { href: '/pipelines', label: 'Deals', icon: GitBranch },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-medium transition-all duration-200 active:scale-95',
                isActive
                  ? 'text-emerald-500 font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon className={cn('h-5 w-5 mb-0.5', isActive ? 'text-emerald-500' : '')} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
