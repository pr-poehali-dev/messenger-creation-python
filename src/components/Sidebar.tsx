import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { ViewType } from './MessengerApp';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  user: { name: string };
  onLogout: () => void;
}

const Sidebar = ({ activeView, onViewChange, user, onLogout }: SidebarProps) => {
  const menuItems = [
    { id: 'chats' as ViewType, icon: 'MessageSquare', label: 'Чаты' },
    { id: 'channels' as ViewType, icon: 'Radio', label: 'Каналы' },
    { id: 'groups' as ViewType, icon: 'Users', label: 'Группы' },
    { id: 'contacts' as ViewType, icon: 'UserPlus', label: 'Контакты' },
  ];

  const actionItems = [
    { id: 'search' as ViewType, icon: 'Search', label: 'Поиск' },
    { id: 'profile' as ViewType, icon: 'User', label: 'Профиль' },
    { id: 'settings' as ViewType, icon: 'Settings', label: 'Настройки' },
  ];

  return (
    <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 space-y-6">
      <div className="relative group cursor-pointer" onClick={() => onViewChange('profile')}>
        <Avatar className="w-12 h-12 gradient-primary glow-effect">
          <AvatarFallback className="bg-transparent text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <Separator className="w-10 bg-border" />

      <nav className="flex-1 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            onClick={() => onViewChange(item.id)}
            className={`w-12 h-12 rounded-xl transition-all ${
              activeView === item.id
                ? 'gradient-primary glow-effect text-white'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            title={item.label}
          >
            <Icon name={item.icon} size={24} />
          </Button>
        ))}
      </nav>

      <Separator className="w-10 bg-border" />

      <div className="flex flex-col space-y-2">
        {actionItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            onClick={() => onViewChange(item.id)}
            className={`w-12 h-12 rounded-xl transition-all ${
              activeView === item.id
                ? 'gradient-primary glow-effect text-white'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            title={item.label}
          >
            <Icon name={item.icon} size={24} />
          </Button>
        ))}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="w-12 h-12 rounded-xl hover:bg-destructive/20 text-destructive hover:text-destructive transition-all"
          title="Выход"
        >
          <Icon name="LogOut" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
