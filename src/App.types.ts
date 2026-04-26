import type { Transition } from 'framer-motion';

export type AppShellProps = {
  isDesktopSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  isCompactSidebarMode: boolean;
  onSidebarToggle: () => void;
  onDesktopSidebarToggle: () => void;
  onRequestCloseMobile: () => void;
};

export type RouteTransitionConfig = {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  exit: { opacity: number; y: number };
  transition: Transition;
};