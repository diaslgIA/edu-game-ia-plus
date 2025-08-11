
export const getDbSubjects = (appSubject: string): string[] => {
  const subjectMapping: Record<string, string[]> = {
    'portugues': ['Português', 'Portugues'],
    'matematica': ['Matemática', 'Matematica'],
    'historia': ['História', 'Historia'],
    'geografia': ['Geografia', 'Geografia '],
    'fisica': ['Física', 'Fisica'],
    'quimica': ['Química', 'Quimica'],
    'biologia': ['Biologia'],
    'filosofia': ['Filosofia', 'Filosofia '],
    'sociologia': ['Sociologia', 'Socioogia'],
    'ingles': ['Inglês', 'Ingles'],
    'espanhol': ['Espanhol'],
    'literatura': ['Literatura'],
    'redacao': ['Redação', 'Redacao']
  };

  const variations = subjectMapping[appSubject.toLowerCase()] || [appSubject];
  
  // Remove duplicates and trim spaces
  return [...new Set(variations.map(v => v.trim()).filter(v => v.length > 0))];
};
