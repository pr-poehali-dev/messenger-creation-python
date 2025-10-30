import { useState, useEffect } from 'react';
import AuthScreen from '@/components/AuthScreen';
import MessengerApp from '@/components/MessengerApp';

const Index = () => {
  const [user, setUser] = useState<{ id: string; phone: string; name: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('messenger_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: { id: string; phone: string; name: string }) => {
    setUser(userData);
    localStorage.setItem('messenger_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('messenger_user');
  };

  return (
    <div className="min-h-screen bg-background">
      {!user ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <MessengerApp user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;