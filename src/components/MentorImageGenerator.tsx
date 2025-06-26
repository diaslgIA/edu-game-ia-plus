
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { useMentorImages } from '@/hooks/useMentorImages';
import { getAllMentors } from '@/data/subjectMentors';

const MentorImageGenerator: React.FC = () => {
  const { generateMentorImage, loading } = useMentorImages();
  const [generatedImages, setGeneratedImages] = useState<{ [key: string]: string }>({});
  const mentors = getAllMentors();

  const mentorDescriptions = {
    'pitagoras': 'Ancient Greek philosopher and mathematician Pythagoras, with long beard and classical robes, wise and thoughtful expression',
    'einstein': 'Albert Einstein with wild gray hair, mustache, wearing a casual sweater, kind eyes behind glasses, warm smile',
    'marie_curie': 'Marie Curie, elegant woman with dark hair in early 1900s style, wearing laboratory coat, determined and intelligent expression',
    'darwin': 'Charles Darwin with full white beard, naturalist explorer clothing, gentle eyes, surrounded by nature elements',
    'camoes': 'Luís de Camões, Portuguese Renaissance poet, with period clothing and distinctive beard, holding a book or quill',
    'herodoto': 'Herodotus, ancient Greek historian, with classical toga and thoughtful expression, scrolls nearby'
  };

  const handleGenerateImage = async (mentorId: string, mentorName: string) => {
    const description = mentorDescriptions[mentorId as keyof typeof mentorDescriptions];
    const imageUrl = await generateMentorImage(mentorName, description);
    
    if (imageUrl) {
      setGeneratedImages(prev => ({
        ...prev,
        [mentorId]: imageUrl
      }));
    }
  };

  const handleDownloadImage = async (imageUrl: string, mentorName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mentor-${mentorName.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar imagem:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Gerador de Imagens dos Mentores</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center text-4xl"
                   style={{ backgroundColor: mentor.backgroundColor, border: `3px solid ${mentor.color}` }}>
                {mentor.avatar}
              </div>
              <h3 className="font-bold text-lg">{mentor.name}</h3>
              <p className="text-sm text-gray-600">{mentor.title}</p>
            </div>

            {generatedImages[mentor.id] && (
              <div className="space-y-2">
                <img 
                  src={generatedImages[mentor.id]} 
                  alt={mentor.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  onClick={() => handleDownloadImage(generatedImages[mentor.id], mentor.name)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download size={16} className="mr-2" />
                  Baixar Imagem
                </Button>
              </div>
            )}

            <Button
              onClick={() => handleGenerateImage(mentor.id, mentor.name)}
              disabled={loading}
              className="w-full"
              style={{ backgroundColor: mentor.color }}
            >
              {loading ? (
                <RefreshCw size={16} className="mr-2 animate-spin" />
              ) : (
                <RefreshCw size={16} className="mr-2" />
              )}
              {generatedImages[mentor.id] ? 'Regenerar' : 'Gerar'} Imagem
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Instruções:</h4>
        <ol className="text-yellow-700 text-sm space-y-1 list-decimal list-inside">
          <li>Clique em "Gerar Imagem" para cada mentor</li>
          <li>Aguarde a geração da imagem (pode levar alguns segundos)</li>
          <li>Clique em "Baixar Imagem" para salvar no seu computador</li>
          <li>Use as imagens baixadas para substituir os emojis nos mentores</li>
        </ol>
      </div>
    </div>
  );
};

export default MentorImageGenerator;
