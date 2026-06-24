import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './components/Layout/AppLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MyRoutine from './pages/MyRoutine';
import Products from './pages/Products';
import ProductAnalyzer from './pages/ProductAnalyzer';
import Profile from './pages/Profile';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="auth-loading">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;
  return <Outlet />;
};

const PublicRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="auth-loading">Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="my-routine" element={<MyRoutine />} />
              <Route path="products" element={<Products />} />
              <Route path="product-analyzer" element={<ProductAnalyzer />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
