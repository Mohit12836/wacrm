"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { LogOut, Menu, Settings as SettingsIcon, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { LogoutConfirmDialog } from "@/components/layout/logout-dialog";

const pageTitles: Record<string, string> = {
  "/dashboard": "dashboard",
  "/inbox": "inbox",
  "/notifications": "notifications",
  "/contacts": "contacts",
  "/pipelines": "pipelines",
  "/broadcasts": "broadcasts",
  "/automations": "automations",
  "/settings": "settings",
};

function getPageTitleKey(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const match = Object.entries(pageTitles).find(([path]) =>
    pathname.startsWith(path),
  );
  return match ? match[1] : "dashboard";
}

interface HeaderProps {
  /** Wired to the shell's drawer state. Used only on mobile — the
   *  hamburger button is hidden on lg+. */
  onOpenSidebar?: () => void;
}

import { useTranslations } from "next-intl";

export function Header({ onOpenSidebar }: HeaderProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const { profile } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const titleKey = getPageTitleKey(pathname);

  const initial =
    profile?.full_name?.charAt(0)?.toUpperCase() ??
    profile?.email?.charAt(0)?.toUpperCase() ??
    "U";

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-2">
          {/* Hamburger — mobile only. 44×44 hit target per Apple HIG. */}
          <button
            type="button"
            onClick={onOpenSidebar}
            aria-label={t("openMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
            {t(titleKey as string)}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted/70 focus:bg-muted/70 focus:outline-none data-popup-open:bg-muted/70 sm:gap-3"
              aria-label={t("openAccountMenu")}
            >
              <Avatar className="size-8 ring-1 ring-border/50">
                {profile?.avatar_url ? (
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={profile.full_name ?? t("defaultAvatar")}
                  />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-foreground sm:inline">
                {profile?.full_name ?? t("defaultUser")}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="min-w-56 rounded-xl border border-border bg-popover p-1.5 shadow-xl ring-border text-popover-foreground"
            >
              <div className="px-2.5 py-2">
                <p className="truncate text-sm font-semibold text-foreground">
                  {profile?.full_name ?? t("defaultUser")}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {profile?.email ?? ""}
                </p>
              </div>
              <DropdownMenuSeparator className="my-1 bg-border" />
              <DropdownMenuItem
                render={
                  <Link
                    href="/settings?tab=profile"
                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors text-popover-foreground hover:bg-muted focus:bg-accent focus:text-accent-foreground"
                  />
                }
              >
                <User className="size-4 text-muted-foreground" />
                {t("menuProfile")}
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    href="/settings?tab=whatsapp"
                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors text-popover-foreground hover:bg-muted focus:bg-accent focus:text-accent-foreground"
                  />
                }
              >
                <SettingsIcon className="size-4 text-muted-foreground" />
                {t("menuSettings")}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-border" />
              <DropdownMenuItem
                onClick={() => setShowLogoutDialog(true)}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500 cursor-pointer font-medium"
              >
                <LogOut className="size-4 text-red-500" />
                {t("menuSignOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />
    </>
  );
}
