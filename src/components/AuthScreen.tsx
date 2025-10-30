import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthScreenProps {
  onLogin: (user: { id: string; phone: string; name: string }) => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [step, setStep] = useState<'phone' | 'code' | 'register'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('code');
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '1234') {
      const existingUser = localStorage.getItem(`user_${phone}`);
      if (existingUser) {
        onLogin(JSON.parse(existingUser));
      } else {
        setStep('register');
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      phone,
      name,
    };
    localStorage.setItem(`user_${phone}`, JSON.stringify(newUser));
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl"></div>
      
      <Card className="w-full max-w-md relative z-10 glow-effect border-border/50 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center glow-effect">
              <Icon name="MessageCircle" size={32} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl gradient-text font-bold">Messenger</CardTitle>
          <CardDescription className="text-muted-foreground">
            {step === 'phone' && 'Введите номер телефона для входа'}
            {step === 'code' && 'Введите код подтверждения'}
            {step === 'register' && 'Создайте профиль'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <Button type="submit" className="w-full gradient-primary glow-effect font-semibold">
                Продолжить
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-foreground">Код подтверждения</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="1234"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground text-center text-2xl tracking-widest"
                  maxLength={4}
                  required
                />
                <p className="text-sm text-muted-foreground text-center">
                  Для демо используйте код: <span className="gradient-text font-semibold">1234</span>
                </p>
              </div>
              <Button type="submit" className="w-full gradient-primary glow-effect font-semibold">
                Подтвердить
                <Icon name="Check" size={20} className="ml-2" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep('phone')}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
            </form>
          )}

          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Ваше имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Как вас зовут?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <Button type="submit" className="w-full gradient-primary glow-effect font-semibold">
                Создать профиль
                <Icon name="Sparkles" size={20} className="ml-2" />
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;
