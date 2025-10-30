import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatView from './ChatView';
import ProfileView from './ProfileView';
import SearchView from './SearchView';

interface MessengerAppProps {
  user: { id: string; phone: string; name: string };
  onLogout: () => void;
}

export type ViewType = 'chats' | 'channels' | 'groups' | 'contacts' | 'search' | 'profile' | 'settings';

const MessengerApp = ({ user, onLogout }: MessengerAppProps) => {
  const [activeView, setActiveView] = useState<ViewType>('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        user={user}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {activeView === 'profile' && (
          <ProfileView user={user} onBack={() => setActiveView('chats')} />
        )}
        
        {activeView === 'search' && (
          <SearchView onBack={() => setActiveView('chats')} />
        )}
        
        {(activeView === 'chats' || activeView === 'channels' || activeView === 'groups' || activeView === 'contacts') && (
          <ChatView
            viewType={activeView}
            user={user}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        )}
        
        {activeView === 'settings' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold gradient-text">Настройки</h2>
              <p className="text-muted-foreground">Раздел в разработке</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerApp;
