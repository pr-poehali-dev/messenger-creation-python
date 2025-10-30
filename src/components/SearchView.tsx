import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface SearchViewProps {
  onBack: () => void;
  onViewProfile: (userId: string) => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'user' | 'chat' | 'channel' | 'group' | 'message';
  description?: string;
  lastMessage?: string;
  members?: number;
}

const SearchView = ({ onBack, onViewProfile }: SearchViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const mockResults: SearchResult[] = [
    { id: '1', name: 'Иван Петров', type: 'user', description: '@ivan_petrov' },
    { id: '2', name: 'Команда Разработки', type: 'group', members: 12, lastMessage: 'Встреча в 15:00' },
    { id: '3', name: 'Новости Tech', type: 'channel', members: 5420, description: 'Технологические новости' },
    { id: '4', name: 'Космический Чат', type: 'chat', lastMessage: 'Привет! Как дела?' },
    { id: '5', name: 'Анна Смирнова', type: 'user', description: '@anna_s' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockResults.filter(result =>
        result.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'user': return 'User';
      case 'chat': return 'MessageSquare';
      case 'channel': return 'Radio';
      case 'group': return 'Users';
      case 'message': return 'Search';
      default: return 'Circle';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'user': return 'Пользователь';
      case 'chat': return 'Чат';
      case 'channel': return 'Канал';
      case 'group': return 'Группа';
      case 'message': return 'Сообщение';
      default: return type;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-xl font-bold gradient-text">Поиск</h2>
        </div>

        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Поиск по сообщениям, людям, каналам..."
            className="pl-10 bg-muted border-border text-foreground"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSearch('')}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-xl"
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {!searchQuery ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center glow-effect">
              <Icon name="Search" size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">Глобальный поиск</h3>
            <p className="text-muted-foreground text-center max-w-md px-4">
              Найдите людей, чаты, каналы, группы и сообщения
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center">
              <Icon name="SearchX" size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить запрос</p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-4 bg-muted">
              <TabsTrigger value="all" className="flex-1">Все</TabsTrigger>
              <TabsTrigger value="users" className="flex-1">Люди</TabsTrigger>
              <TabsTrigger value="chats" className="flex-1">Чаты</TabsTrigger>
              <TabsTrigger value="channels" className="flex-1">Каналы</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="flex-1 mt-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => result.type === 'user' && onViewProfile(result.id)}
                      className="w-full p-4 rounded-xl hover:bg-muted transition-all text-left"
                    >
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12 gradient-primary">
                          <AvatarFallback className="bg-transparent text-white font-semibold">
                            {result.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-foreground">{result.name}</h3>
                            <span className="flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              <Icon name={getIconForType(result.type)} size={12} />
                              <span>{getTypeLabel(result.type)}</span>
                            </span>
                          </div>
                          {result.description && (
                            <p className="text-sm text-muted-foreground">{result.description}</p>
                          )}
                          {result.lastMessage && (
                            <p className="text-sm text-muted-foreground truncate">{result.lastMessage}</p>
                          )}
                          {result.members && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {result.members.toLocaleString()} участников
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="users" className="flex-1 mt-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {results.filter(r => r.type === 'user').map((result) => (
                    <button
                      key={result.id}
                      onClick={() => onViewProfile(result.id)}
                      className="w-full p-4 rounded-xl hover:bg-muted transition-all text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 gradient-primary">
                          <AvatarFallback className="bg-transparent text-white font-semibold">
                            {result.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{result.name}</h3>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        <Button className="gradient-primary glow-effect">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          Написать
                        </Button>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chats" className="flex-1 mt-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {results.filter(r => r.type === 'chat' || r.type === 'group').map((result) => (
                    <button
                      key={result.id}
                      className="w-full p-4 rounded-xl hover:bg-muted transition-all text-left"
                    >
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12 gradient-primary">
                          <AvatarFallback className="bg-transparent text-white font-semibold">
                            {result.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{result.name}</h3>
                          <p className="text-sm text-muted-foreground">{result.lastMessage}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="channels" className="flex-1 mt-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {results.filter(r => r.type === 'channel').map((result) => (
                    <button
                      key={result.id}
                      className="w-full p-4 rounded-xl hover:bg-muted transition-all text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 gradient-primary">
                          <AvatarFallback className="bg-transparent text-white font-semibold">
                            {result.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{result.name}</h3>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {result.members?.toLocaleString()} подписчиков
                          </p>
                        </div>
                        <Button className="gradient-primary glow-effect">
                          Подписаться
                        </Button>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default SearchView;