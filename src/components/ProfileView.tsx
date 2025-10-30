import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ProfileViewProps {
  user: { id: string; phone: string; name: string };
  onBack: () => void;
}

const ProfileView = ({ user, onBack }: ProfileViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState('Привет! Я использую Messenger');
  const [username, setUsername] = useState('@' + user.name.toLowerCase().replace(/\s/g, ''));

  const handleSave = () => {
    const updatedUser = { ...user, name };
    localStorage.setItem(`user_${user.phone}`, JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h2 className="text-xl font-bold gradient-text">Профиль</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="bg-card border-border glow-effect">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 gradient-primary glow-effect">
                    <AvatarFallback className="bg-transparent text-white font-bold text-5xl">
                      {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full gradient-primary glow-effect"
                  >
                    <Icon name="Camera" size={20} />
                  </Button>
                </div>

                {!isEditing ? (
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{name}</h3>
                    <p className="text-muted-foreground">{username}</p>
                    <p className="text-sm text-muted-foreground max-w-md">{bio}</p>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="gradient-primary glow-effect mt-4"
                    >
                      <Icon name="Edit" size={20} className="mr-2" />
                      Редактировать профиль
                    </Button>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Имя пользователя</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Input
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex-1 gradient-primary glow-effect">
                        <Icon name="Check" size={20} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p className="font-semibold text-foreground">{user.phone}</p>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Icon name="Hash" size={24} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-mono text-sm text-foreground">{user.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Статистика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl gradient-primary flex items-center justify-center glow-effect">
                    <Icon name="MessageSquare" size={24} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold gradient-text">42</p>
                  <p className="text-sm text-muted-foreground">Чатов</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl gradient-primary flex items-center justify-center glow-effect">
                    <Icon name="Users" size={24} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold gradient-text">128</p>
                  <p className="text-sm text-muted-foreground">Контактов</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl gradient-primary flex items-center justify-center glow-effect">
                    <Icon name="Radio" size={24} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold gradient-text">15</p>
                  <p className="text-sm text-muted-foreground">Каналов</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
