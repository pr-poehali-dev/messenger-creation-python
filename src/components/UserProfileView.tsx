import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface UserProfileViewProps {
  user: { id: string; name: string; username: string; bio: string };
  onBack: () => void;
}

const UserProfileView = ({ user, onBack }: UserProfileViewProps) => {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h2 className="text-xl font-bold gradient-text">Профиль пользователя</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="bg-card border-border glow-effect">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32 gradient-primary glow-effect">
                  <AvatarFallback className="bg-transparent text-white font-bold text-5xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{user.name}</h3>
                  <p className="text-muted-foreground">{user.username}</p>
                  <p className="text-sm text-muted-foreground max-w-md">{user.bio}</p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button className="gradient-primary glow-effect">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Написать
                  </Button>
                  <Button variant="outline" className="border-border">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button variant="outline" className="border-border">
                    <Icon name="Video" size={20} className="mr-2" />
                    Видео
                  </Button>
                </div>
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
                  <Icon name="User" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Имя пользователя</p>
                  <p className="font-semibold text-foreground">{user.username}</p>
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

              <Separator className="bg-border" />

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Последняя активность</p>
                  <p className="font-semibold text-foreground">5 минут назад</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Общие чаты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted transition-all cursor-pointer">
                  <Avatar className="w-10 h-10 gradient-primary">
                    <AvatarFallback className="bg-transparent text-white font-semibold">
                      К
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Команда Разработки</p>
                    <p className="text-sm text-muted-foreground">128 участников</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted transition-all cursor-pointer">
                  <Avatar className="w-10 h-10 gradient-primary">
                    <AvatarFallback className="bg-transparent text-white font-semibold">
                      Т
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Технологии 2024</p>
                    <p className="text-sm text-muted-foreground">342 участника</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10">
                  <Icon name="UserX" size={20} className="mr-2" />
                  Заблокировать
                </Button>
                <Button variant="outline" className="flex-1 border-border">
                  <Icon name="Flag" size={20} className="mr-2" />
                  Пожаловаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
