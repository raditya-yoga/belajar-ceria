import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PremiumProvider } from './context/PremiumContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Lesson from './pages/Lesson';
import MobilePay from './pages/MobilePay';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PremiumProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lesson/:subjectId" element={<Lesson />} />
            <Route path="/lesson/:subjectId/:topicIndex" element={<Lesson />} />
            <Route path="/bayar" element={<MobilePay />} />
            <Route path="/progres" element={<Progress />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PremiumProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
