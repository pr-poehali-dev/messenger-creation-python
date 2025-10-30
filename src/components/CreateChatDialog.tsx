import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface CreateChatDialogProps {
  open: boolean;
  onClose: () => void;
  type: 'chat' | 'channel' | 'group';
  onCreateChat: (name: string, description?: string) => void;
}

const CreateChatDialog = ({ open, onClose, type, onCreateChat }: CreateChatDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateChat(name, description || undefined);
      setName('');
      setDescription('');
      onClose();
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'channel': return 'Создать канал';
      case 'group': return 'Создать группу';
      default: return 'Создать чат';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'channel': return 'Каналы позволяют транслировать сообщения неограниченной аудитории';
      case 'group': return 'Группы позволяют общаться нескольким участникам';
      default: return 'Начните общение один на один';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'channel': return 'Radio';
      case 'group': return 'Users';
      default: return 'MessageCircle';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-effect">
              <Icon name={getIcon()} size={24} className="text-white" />
            </div>
            <DialogTitle className="text-2xl gradient-text">{getTitle()}</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Название {type === 'channel' ? 'канала' : type === 'group' ? 'группы' : 'чата'}
            </Label>
            <Input
              id="name"
              placeholder={type === 'channel' ? 'Новости Tech' : type === 'group' ? 'Команда разработки' : 'Космический чат'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted border-border text-foreground"
              required
            />
          </div>

          {(type === 'channel' || type === 'group') && (
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Описание (необязательно)
              </Label>
              <Textarea
                id="description"
                placeholder="Расскажите, о чем этот канал..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-muted border-border text-foreground resize-none"
                rows={3}
              />
            </div>
          )}

          <DialogFooter className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border"
            >
              Отмена
            </Button>
            <Button type="submit" className="gradient-primary glow-effect">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatDialog;
