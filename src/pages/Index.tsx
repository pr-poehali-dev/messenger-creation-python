import { useState } from 'react';
import AuthScreen from '@/components/AuthScreen';
import MessengerApp from '@/components/MessengerApp';

const Index = () => {
  const [user, setUser] = useState<{ id: string; phone: string; name: string } | null>(null);

  const handleLogin = (userData: { id: string; phone: string; name: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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