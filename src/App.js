import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import BookingDetail from './pages/BookingDetail';
import LanguageSelector from './pages/LanguageSelector';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import MSP from './pages/MSP';
import News from './pages/News';
import Operations from './pages/OperationsMultilingual';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // demo mode for hackathon
  const [userData, setUserData] = useState({ name: 'Farmer User', farmerId: 'K-12345', village: 'Haryana' });
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <LanguageProvider>
      {!hasChosenLanguage ? (
        <LanguageSelector onSelectLanguage={() => setHasChosenLanguage(true)} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login onSuccess={(data) => { setUserData(data); setIsLoggedIn(true); }} />} />
            <Route path="/signup" element={<Signup onSuccess={(data) => { setUserData(data); setIsLoggedIn(true); }} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard userData={userData} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile userData={userData} /> : <Navigate to="/login" />} />
            <Route path="/news" element={isLoggedIn ? <News /> : <Navigate to="/login" />} />
            <Route path="/bookings" element={isLoggedIn ? <Bookings userData={userData} /> : <Navigate to="/login" />} />
            <Route path="/bookings/:id" element={isLoggedIn ? <BookingDetail /> : <Navigate to="/login" />} />
            <Route path="/payments" element={isLoggedIn ? <Payments userData={userData} /> : <Navigate to="/login" />} />
            <Route path="/msp" element={isLoggedIn ? <MSP /> : <Navigate to="/login" />} />
            <Route path="/queue" element={isLoggedIn ? <Operations /> : <Navigate to="/login" />} />
            <Route path="/operations" element={isLoggedIn ? <Operations /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      )}
    </LanguageProvider>
  );
}
