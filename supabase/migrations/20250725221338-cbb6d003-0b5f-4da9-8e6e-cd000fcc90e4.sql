
-- Create knowledge_areas table (Level 1 - Knowledge Areas)
CREATE TABLE IF NOT EXISTS public.knowledge_areas (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add knowledge_area_id to subjects table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'subjects' AND column_name = 'knowledge_area_id') THEN
    ALTER TABLE public.subjects ADD COLUMN knowledge_area_id INTEGER;
  END IF;
END $$;

-- Add subject_id to subject_contents table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'subject_contents' AND column_name = 'subject_id') THEN
    ALTER TABLE public.subject_contents ADD COLUMN subject_id INTEGER;
  END IF;
END $$;

-- Create foreign key relationships
DO $$ 
BEGIN
  -- Foreign key from subjects to knowledge_areas
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                WHERE constraint_name = 'fk_subjects_knowledge_area') THEN
    ALTER TABLE public.subjects 
    ADD CONSTRAINT fk_subjects_knowledge_area 
    FOREIGN KEY (knowledge_area_id) REFERENCES public.knowledge_areas(id);
  END IF;
  
  -- Foreign key from subject_contents to subjects
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                WHERE constraint_name = 'fk_subject_contents_subject') THEN
    ALTER TABLE public.subject_contents 
    ADD CONSTRAINT fk_subject_contents_subject 
    FOREIGN KEY (subject_id) REFERENCES public.subjects(id);
  END IF;
END $$;

-- Insert the 4 knowledge areas
INSERT INTO public.knowledge_areas (name, icon, color) VALUES
  ('Linguagens e Códigos', '📝', 'from-blue-500 to-blue-700'),
  ('Matemática', '📐', 'from-purple-500 to-purple-700'),
  ('Ciências da Natureza', '🔬', 'from-green-500 to-green-700'),
  ('Ciências Humanas', '🌍', 'from-orange-500 to-orange-700')
ON CONFLICT DO NOTHING;

-- Update subjects with proper knowledge_area_id relationships
UPDATE public.subjects SET knowledge_area_id = 1 WHERE name IN ('Português', 'Inglês', 'Espanhol', 'Literatura', 'Redação');
UPDATE public.subjects SET knowledge_area_id = 2 WHERE name = 'Matemática';
UPDATE public.subjects SET knowledge_area_id = 3 WHERE name IN ('Física', 'Química', 'Biologia');
UPDATE public.subjects SET knowledge_area_id = 4 WHERE name IN ('História', 'Geografia', 'Filosofia', 'Sociologia');

-- Add RLS policies for knowledge_areas
ALTER TABLE public.knowledge_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for knowledge_areas" 
  ON public.knowledge_areas 
  FOR SELECT 
  USING (true);

-- Update content_data column to be properly structured if needed
UPDATE public.subject_contents 
SET content_data = jsonb_build_object(
  'sections', 
  CASE 
    WHEN content_data IS NULL THEN jsonb_build_array(
      jsonb_build_object('title', 'Introdução', 'content', COALESCE(description, 'Conteúdo em desenvolvimento'))
    )
    WHEN jsonb_typeof(content_data) = 'object' AND content_data ? 'sections' THEN content_data
    ELSE jsonb_build_object(
      'sections', 
      jsonb_build_array(
        jsonb_build_object('title', 'Conteúdo', 'content', content_data::text)
      )
    )
  END
)
WHERE content_data IS NULL OR NOT (content_data ? 'sections');
