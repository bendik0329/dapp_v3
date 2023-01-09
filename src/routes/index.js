/* eslint-disable prettier/prettier */
import { Suspense, lazy } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import AuthLayout from '../layouts/auth';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: -1,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <FiatPage /> },
        { path: '/fiat', element: <FiatPage /> },
        { path: '/invest', element: <PrivacyPage /> },
        { path: '/stake', element: <TermsPage /> },
        { path: '/swap', element: <SwapPage /> },
        { path: '/invest_detail', element: <InvestEquity /> },
        { path: '/team', element: <TeamPage /> },
        { path: '/ecosystem', element: <Ecosystem /> },
        { path: '/tokenomics', element: <TokenomicsPage /> },
        { path: '/privacy', element: <PrivacyPage /> },
        { path: '/terms', element: <TermsPage /> },
        { path: '/cookies', element: <CookiesPage /> },
        { path: '/faq', element: <FaqPage /> }
      ]
    },
    {
      path: 'auth/',
      element: <AuthLayout />,
      children: [
        { path: '/register', element: <RegisterPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/success', element: <LoginPage /> }
        
      ]
    },
    {
      path: 'kyc/',
      element: localStorage.getItem('user_data') ? (<MainLayout />) :
      (
        <Navigate to="/auth/login" replace />
      ),
      children: [
        { path: '/', element: <KYCPage /> },
      ]
    }
  ]);
}
// Main
const TeamPage = Loadable(lazy(() => import('../pages/TeamPage')));
const FiatPage = Loadable(lazy(() => import('../pages/Fiat')));
const SwapPage = Loadable(lazy(() => import('../pages/Swap')));
const Ecosystem = Loadable(lazy(() => import('../pages/Ecosystem')));
const TokenomicsPage = Loadable(lazy(() => import('../pages/TokenomicsPage')));
const PrivacyPage = Loadable(lazy(() => import('../pages/PrivacyPage')));
const TermsPage = Loadable(lazy(() => import('../pages/TermsPage')));
const CookiesPage = Loadable(lazy(() => import('../pages/CookiesPage')));
const FaqPage = Loadable(lazy(() => import('../pages/FaqPage')));
const InvestEquity = Loadable(lazy(() => import('../pages/InvestEquity')));
const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const KYCPage = Loadable(lazy(() => import('../pages/KYC')));
