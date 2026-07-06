'use client';

import { Menu } from 'lucide-react';
import { memo, useCallback } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = memo(function Header({ onMenuClick }: HeaderProps) {
  const handleMenuClick = useCallback(() => {
    onMenuClick?.();
  }, [onMenuClick]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/20 bg-white/40 backdrop-blur-xl px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          USIE
        </h1>
      </div>
    </header>
  );
});