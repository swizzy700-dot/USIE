'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map, 
  Search, 
  TrendingUp, 
  History, 
  Settings,
  X
} from 'lucide-react';
import { memo, useCallback } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NavLink = memo(({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: typeof navigation[0]; 
  isActive: boolean; 
  onClick?: () => void;
}) => (
  <Link
    href={item.href}
    onClick={onClick}
    className={`
      flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all
      ${isActive 
        ? 'bg-blue-50/50 text-blue-700 shadow-sm' 
        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
      }
    `}
  >
    <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
    {item.name}
  </Link>
));

NavLink.displayName = 'NavLink';

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleBackdropClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleLinkClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      
      <aside 
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/20 bg-white/40 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-white/20 px-6">
            <div className="flex items-center gap-2">
              <div className="usa-gradient flex h-8 w-8 items-center justify-center rounded-lg">
                <span className="text-sm font-bold text-white">US</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">USIE</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                onClick={handleLinkClick}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/20 px-6 py-4">
            <p className="text-xs text-gray-500">
              USA Search Intelligence Engine
            </p>
            <p className="text-xs text-gray-400">Phase 5 - Production Ready</p>
          </div>
        </div>
      </aside>
    </>
  );
}