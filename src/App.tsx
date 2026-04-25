import React, { Suspense, lazy, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.scss';

const TABLET_BREAKPOINT = 1024;

const Orders = lazy(() => import('./pages/Orders/Orders'));
const Products = lazy(() => import('./pages/Products/Products'));
const Users = lazy(() => import('./pages/Users/Users'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Groups = lazy(() => import('./pages/Groups/Groups'));

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
        <div className={`app${isDesktopSidebarCollapsed && !isCompactSidebarMode ? ' app--sidebar-collapsed' : ''}${isMobileSidebarOpen ? ' app--sidebar-mobile-open' : ''}`}>
          <Header onMenuToggle={handleSidebarToggle} showMenuButton={isCompactSidebarMode} />
          <Sidebar
            collapsed={isDesktopSidebarCollapsed}
            isCompactMode={isCompactSidebarMode}
            isMobileOpen={isMobileSidebarOpen}
            onToggleDesktop={() => setDesktopSidebarCollapsed((prev) => !prev)}
            onRequestCloseMobile={() => setMobileSidebarOpen(false)}
          />
          <main className="main-content">
            <Suspense fallback={<div className="route-loader">Загрузка страницы...</div>}>
              <Routes>
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="*" element={<Navigate to="/orders" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
