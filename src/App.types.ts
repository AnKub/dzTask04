import type { Transition } from 'framer-motion';

export type AppShellProps = {
  isDesktopSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  isCompactSidebarMode: boolean;
  inventoryLoadError: string | null;
  isInventoryLoading: boolean;
  onSidebarToggle: () => void;
  onDesktopSidebarToggle: () => void;
  onRequestCloseMobile: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
};

export type RouteTransitionConfig = {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  exit: { opacity: number; y: number };
  transition: Transition;
};