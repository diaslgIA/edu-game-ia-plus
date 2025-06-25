
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, Download, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LibraryFile {
  id: string;
  guild_id: string;
  uploader_id: string;
  file_name: string;
  description: string;
  storage_path: string;
  created_at: string;
  uploader_name: string;
}

interface GuildLibraryProps {
  guildId: string;
}

const GuildLibrary: React.FC<GuildLibraryProps> = ({ guildId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<LibraryFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDescription, setFileDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('guild_library_files')
        .select(`
          *,
          profiles!guild_library_files_uploader_id_fkey(full_name)
        `)
        .eq('guild_id', guildId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedFiles = data.map(file => ({
        ...file,
        uploader_name: file.profiles?.full_name || 'Usuário'
      }));

      setFiles(processedFiles);
    } catch (error) {
      console.error('Erro ao buscar arquivos:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile || !user) return;

    try {
      setUploading(true);
      
      // Criar nome único para o arquivo
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `guild-files/${guildId}/${fileName}`;

      // Upload para o storage
      const { error: uploadError } = await supabase.storage
        .from('guild-library')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Salvar referência no banco
      const { error: dbError } = await supabase
        .from('guild_library_files')
        .insert({
          guild_id: guildId,
          uploader_id: user.id,
          file_name: selectedFile.name,
          description: fileDescription.trim(),
          storage_path: filePath
        });

      if (dbError) throw dbError;

      toast({
        title: "Arquivo enviado!",
        description: "O arquivo foi adicionado à biblioteca da guilda.",
      });

      setShowUploadModal(false);
      setSelectedFile(null);
      setFileDescription('');
      fetchFiles();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o arquivo.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async (file: LibraryFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('guild-library')
        .download(file.storage_path);

      if (error) throw error;

      // Criar URL para download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o arquivo.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [guildId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return <FileText size={16} className="text-blue-400" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 bg-white/10 backdrop-blur-md flex items-center justify-between">
        <h2 className="text-white font-semibold text-sm">Biblioteca</h2>
        <Button
          onClick={() => setShowUploadModal(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 text-xs"
        >
          <Upload size={14} className="mr-1" />
          Upload
        </Button>
      </div>

      {/* Files */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {loading ? (
          <div className="text-center text-white/80">Carregando arquivos...</div>
        ) : files.length === 0 ? (
          <div className="text-center text-white/80 py-8">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum arquivo na biblioteca</p>
            <p className="text-sm opacity-75">Seja o primeiro a compartilhar um material!</p>
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-3"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getFileIcon(file.file_name)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-sm truncate">{file.file_name}</h3>
                  {file.description && (
                    <p className="text-white/80 text-xs mt-1">{file.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-white/60">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{file.uploader_name}</span>
                    </div>
                    <span>{formatDate(file.created_at)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => downloadFile(file)}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white p-1"
                >
                  <Download size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Upload de Arquivo</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Arquivo</label>
                <Input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceitos: PDF, DOC, DOCX, TXT, JPG, PNG
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                <Input
                  value={fileDescription}
                  onChange={(e) => setFileDescription(e.target.value)}
                  placeholder="Descreva o conteúdo do arquivo..."
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(false)}
                className="flex-1"
                disabled={uploading}
              >
                Cancelar
              </Button>
              <Button
                onClick={uploadFile}
                disabled={!selectedFile || uploading}
                className="flex-1"
              >
                {uploading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuildLibrary;
