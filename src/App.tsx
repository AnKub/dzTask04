import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type { AppShellProps, RouteTransitionConfig } from './App.types';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { store } from './store';
import './App.scss';

const TABLET_BREAKPOINT = 1024;

const Orders = lazy(() => import('./pages/Orders/Orders'));
const Products = lazy(() => import('./pages/Products/Products'));
const Users = lazy(() => import('./pages/Users/Users'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Groups = lazy(() => import('./pages/Groups/Groups'));

const AppShell: React.FC<AppShellProps> = ({
  isDesktopSidebarCollapsed,
  isMobileSidebarOpen,
  isCompactSidebarMode,
  onSidebarToggle,
  onDesktopSidebarToggle,
  onRequestCloseMobile,
}) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const routeTransition = useMemo<RouteTransitionConfig>(() => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      };
    }

    return isCompactSidebarMode
      ? {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          transition: { duration: 0.18, ease: 'easeOut' },
        }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
          transition: { duration: 0.26, ease: 'easeOut' },
        };
  }, [isCompactSidebarMode, prefersReducedMotion]);

  return (
    <div className={`app${isDesktopSidebarCollapsed && !isCompactSidebarMode ? ' app--sidebar-collapsed' : ''}${isMobileSidebarOpen ? ' app--sidebar-mobile-open' : ''}`}>
      <Header onMenuToggle={onSidebarToggle} showMenuButton={isCompactSidebarMode} />
      <Sidebar
        collapsed={isDesktopSidebarCollapsed}
        isCompactMode={isCompactSidebarMode}
        isMobileOpen={isMobileSidebarOpen}
        onToggleDesktop={onDesktopSidebarToggle}
        onRequestCloseMobile={onRequestCloseMobile}
      />
      <main className="main-content">
        <Suspense fallback={<div className="route-loader">Загрузка страницы...</div>}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              className="route-view"
              initial={routeTransition.initial}
              animate={routeTransition.animate}
              exit={routeTransition.exit}
              transition={routeTransition.transition}
            >
              <Routes location={location}>
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="*" element={<Navigate to="/orders" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
};

function App() {
  const [isDesktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCompactSidebarMode, setCompactSidebarMode] = useState(() => window.innerWidth <= TABLET_BREAKPOINT);

  useEffect(() => {
    const syncViewportMode = () => {
      const isCompact = window.innerWidth <= TABLET_BREAKPOINT;

      setCompactSidebarMode(isCompact);

      if (!isCompact) {
        setMobileSidebarOpen(false);
      }
    };

    syncViewportMode();
    window.addEventListener('resize', syncViewportMode);

    return () => {
      window.removeEventListener('resize', syncViewportMode);
    };
  }, []);

  const handleSidebarToggle = () => {
    if (isCompactSidebarMode) {
      setMobileSidebarOpen((prev) => !prev);
      return;
    }

    setDesktopSidebarCollapsed((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <Router>
        <AppShell
          isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
          isMobileSidebarOpen={isMobileSidebarOpen}
          isCompactSidebarMode={isCompactSidebarMode}
          onSidebarToggle={handleSidebarToggle}
          onDesktopSidebarToggle={() => setDesktopSidebarCollapsed((prev) => !prev)}
          onRequestCloseMobile={() => setMobileSidebarOpen(false)}
        />
      </Router>
    </Provider>
  );
}

export default App;
