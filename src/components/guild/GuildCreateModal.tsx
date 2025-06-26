
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

interface GuildCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  creating: boolean;
  newGuildData: {
    name: string;
    description: string;
    isPublic: boolean;
  };
  setNewGuildData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    isPublic: boolean;
  }>>;
}

const GuildCreateModal: React.FC<GuildCreateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  creating,
  newGuildData,
  setNewGuildData
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Guilda</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="guild-name">Nome da Guilda</Label>
            <Input
              id="guild-name"
              value={newGuildData.name}
              onChange={(e) => setNewGuildData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite o nome da guilda..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guild-description">Descrição</Label>
            <Textarea
              id="guild-description"
              value={newGuildData.description}
              onChange={(e) => setNewGuildData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva a guilda..."
              required
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="guild-public"
              checked={newGuildData.isPublic}
              onCheckedChange={(checked) => setNewGuildData(prev => ({ ...prev, isPublic: checked }))}
            />
            <Label htmlFor="guild-public">Guilda Pública</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={creating}>
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar Guilda'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GuildCreateModal;
