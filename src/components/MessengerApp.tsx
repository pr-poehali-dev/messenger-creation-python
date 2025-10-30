import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatView from './ChatView';
import ProfileView from './ProfileView';
import SearchView from './SearchView';
import UserProfileView from './UserProfileView';

interface MessengerAppProps {
  user: { id: string; phone: string; name: string };
  onLogout: () => void;
}

export type ViewType = 'chats' | 'channels' | 'groups' | 'contacts' | 'search' | 'profile' | 'settings';

const MessengerApp = ({ user, onLogout }: MessengerAppProps) => {
  const [activeView, setActiveView] = useState<ViewType>('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [viewingUser, setViewingUser] = useState<{ id: string; name: string; username: string; bio: string } | null>(null);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        user={user}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {viewingUser ? (
          <UserProfileView user={viewingUser} onBack={() => setViewingUser(null)} />
        ) : (
          <>
            {activeView === 'profile' && (
              <ProfileView user={user} onBack={() => setActiveView('chats')} />
            )}
            
            {activeView === 'search' && (
              <SearchView onBack={() => setActiveView('chats')} onViewProfile={(userId) => {
                setViewingUser({
                  id: userId,
                  name: 'Иван Петров',
                  username: '@ivan_petrov',
                  bio: 'Привет! Я использую Messenger'
                });
              }} />
            )}
        
            {(activeView === 'chats' || activeView === 'channels' || activeView === 'groups' || activeView === 'contacts') && (
              <ChatView
                viewType={activeView}
                user={user}
                selectedChat={selectedChat}
                onSelectChat={setSelectedChat}
                onViewProfile={(userId) => {
                  setViewingUser({
                    id: userId,
                    name: 'Космический Чат',
                    username: '@cosmic_chat',
                    bio: 'Обсуждаем космос и технологии'
                  });
                }}
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
          </>
        )}
      </div>
    </div>
  );
};

export default MessengerApp;