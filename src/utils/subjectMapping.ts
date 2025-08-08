
export interface SubjectMapping {
  slug: string;
  displayName: string;
  variants: string[];
}

export const subjectMappings: SubjectMapping[] = [
  {
    slug: 'matematica',
    displayName: 'Matemática',
    variants: ['matematica', 'Matemática']
  },
  {
    slug: 'portugues',
    displayName: 'Português',
    variants: ['portugues', 'Português']
  },
  {
    slug: 'fisica',
    displayName: 'Física',
    variants: ['fisica', 'Física']
  },
  {
    slug: 'quimica',
    displayName: 'Química',
    variants: ['quimica', 'Química']
  },
  {
    slug: 'biologia',
    displayName: 'Biologia',
    variants: ['biologia', 'Biologia']
  },
  {
    slug: 'historia',
    displayName: 'História',
    variants: ['historia', 'História']
  },
  {
    slug: 'geografia',
    displayName: 'Geografia',
    variants: ['geografia', 'Geografia']
  },
  {
    slug: 'filosofia',
    displayName: 'Filosofia',
    variants: ['filosofia', 'Filosofia']
  },
  {
    slug: 'sociologia',
    displayName: 'Sociologia',
    variants: ['sociologia', 'Sociologia']
  },
  {
    slug: 'ingles',
    displayName: 'Inglês',
    variants: ['ingles', 'Inglês', 'inglês']
  },
  {
    slug: 'espanhol',
    displayName: 'Espanhol',
    variants: ['espanhol', 'Espanhol']
  }
];

export const getSubjectMapping = (slug: string): SubjectMapping | null => {
  return subjectMappings.find(mapping => mapping.slug === slug.toLowerCase()) || null;
};

export const getSubjectDisplayName = (slug: string): string => {
  const mapping = getSubjectMapping(slug);
  return mapping ? mapping.displayName : slug;
};

export const getSubjectVariants = (slug: string): string[] => {
  const mapping = getSubjectMapping(slug);
  return mapping ? mapping.variants : [slug];
};
