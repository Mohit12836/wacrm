'use client';

import * as React from 'react';
import { LogOut, ShieldAlert, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogoutConfirmDialog({ open, onOpenChange }: LogoutDialogProps) {
  const { signOut } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (err) {
      console.error('Sign out error:', err);
      setLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-6 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20 shadow-inner">
            <LogOut className="h-6 w-6 text-red-500" />
          </div>
          <div className="space-y-1.5 flex-1">
            <DialogHeader className="p-0 text-left">
              <DialogTitle className="text-lg font-bold text-foreground">
                Sign Out Confirmation
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
                Are you sure you want to log out of your AI Sales workspace? Unsaved changes in chat drafts will be reset.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="rounded-xl px-4 text-sm font-medium hover:bg-muted/80 transition-all"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
            className="rounded-xl px-5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 transition-all active:scale-95 gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing out...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4" />
                Sign Out
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
