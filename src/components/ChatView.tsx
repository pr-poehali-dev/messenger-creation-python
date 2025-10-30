import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { ViewType } from './MessengerApp';
import CreateChatDialog from './CreateChatDialog';

interface ChatViewProps {
  viewType: ViewType;
  user: { id: string; name: string };
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  onViewProfile: (userId: string) => void;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  type: 'chat' | 'channel' | 'group' | 'contact';
}

interface Message {
  id: string;
  text: string;
  sender: string;
  time: string;
  isOwn: boolean;
}

const ChatView = ({ viewType, user, selectedChat, onSelectChat, onViewProfile }: ChatViewProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const savedChats = localStorage.getItem('messenger_chats');
    const allChats: Chat[] = savedChats ? JSON.parse(savedChats) : [
      { id: '1', name: 'Космический Чат', lastMessage: 'Привет! Как дела?', time: '14:30', unread: 2, type: 'chat' },
      { id: '2', name: 'Новости Технологий', lastMessage: 'Новый релиз React 19', time: '13:15', type: 'channel' },
      { id: '3', name: 'Команда Разработки', lastMessage: 'Встреча в 15:00', time: '12:00', unread: 5, type: 'group' },
      { id: '4', name: 'Анна Иванова', lastMessage: 'Отправила файл', time: '11:45', type: 'contact' },
    ];
    setChats(allChats.filter(chat => chat.type === viewType || (viewType === 'chats' && chat.type === 'chat')));
  }, [viewType]);

  useEffect(() => {
    if (selectedChat) {
      const mockMessages: Message[] = [
        { id: '1', text: 'Привет! Как дела?', sender: 'Космический Чат', time: '14:25', isOwn: false },
        { id: '2', text: 'Отлично! Работаю над новым проектом 🚀', sender: user.name, time: '14:26', isOwn: true },
        { id: '3', text: 'Звучит круто! Расскажи подробнее', sender: 'Космический Чат', time: '14:27', isOwn: false },
      ];
      setMessages(mockMessages);
    }
  }, [selectedChat, user.name]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: user.name,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const getViewTitle = () => {
    switch (viewType) {
      case 'chats': return 'Чаты';
      case 'channels': return 'Каналы';
      case 'groups': return 'Группы';
      case 'contacts': return 'Контакты';
      default: return 'Сообщения';
    }
  };

  const getEmptyMessage = () => {
    switch (viewType) {
      case 'channels': return 'Подпишитесь на каналы';
      case 'groups': return 'Создайте или вступите в группу';
      case 'contacts': return 'Добавьте контакты';
      default: return 'Начните новый чат';
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row">
      <div className={`w-full md:w-80 border-r border-border flex flex-col bg-card ${
        selectedChat ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold gradient-text">{getViewTitle()}</h2>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all hover:bg-muted ${
                    selectedChat === chat.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12 gradient-primary">
                      <AvatarFallback className="bg-transparent text-white font-semibold">
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full gradient-primary text-white">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>{getEmptyMessage()}</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border">
          <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full gradient-primary glow-effect">
            <Icon name="Plus" size={20} className="mr-2" />
            Новый {viewType === 'channels' ? 'канал' : viewType === 'groups' ? 'группа' : 'чат'}
          </Button>
        </div>
        
        <CreateChatDialog
          open={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          type={viewType === 'channels' ? 'channel' : viewType === 'groups' ? 'group' : 'chat'}
          onCreateChat={(name, description) => {
            const newChat: Chat = {
              id: Date.now().toString(),
              name,
              lastMessage: description || 'Чат создан',
              time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
              type: viewType === 'channels' ? 'channel' : viewType === 'groups' ? 'group' : 'chat',
            };
            const savedChats = localStorage.getItem('messenger_chats');
            const allChats: Chat[] = savedChats ? JSON.parse(savedChats) : [];
            const updatedChats = [newChat, ...allChats];
            localStorage.setItem('messenger_chats', JSON.stringify(updatedChats));
            setChats([newChat, ...chats]);
          }}
        />
      </div>

      <div className={`flex-1 flex flex-col ${
        selectedChat ? 'flex' : 'hidden md:flex'
      }`}>
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelectChat(null)}
                  className="md:hidden rounded-xl"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onViewProfile(selectedChat)}>
                  <Avatar className="w-10 h-10 gradient-primary">
                    <AvatarFallback className="bg-transparent text-white font-semibold">
                      {chats.find(c => c.id === selectedChat)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground hover:gradient-text transition-all">
                      {chats.find(c => c.id === selectedChat)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">онлайн</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Icon name="Video" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'gradient-primary text-white glow-effect'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card">
              <div className="flex space-x-2">
                <Button type="button" variant="ghost" size="icon" className="rounded-xl">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  className="flex-1 bg-muted border-0 text-foreground"
                />
                <Button type="button" variant="ghost" size="icon" className="rounded-xl">
                  <Icon name="Smile" size={20} />
                </Button>
                <Button type="submit" className="gradient-primary glow-effect rounded-xl">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-3xl gradient-primary flex items-center justify-center glow-effect">
                <Icon name="MessageCircle" size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">Выберите чат</h3>
              <p className="text-muted-foreground">Начните общение прямо сейчас</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatView;