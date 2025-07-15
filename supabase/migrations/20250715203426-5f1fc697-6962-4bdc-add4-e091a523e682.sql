-- Inserir as novas perguntas de História no quiz
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level) VALUES 
('História', 'Brasil República', 'Qual foi o principal objetivo da Proclamação da República no Brasil em 1889?', 
 '["Abolir a escravidão definitivamente", "Derrubar a monarquia e instaurar o regime republicano", "Conquistar a independência de Portugal", "Estabelecer o sistema parlamentarista"]', 
 1, 'A Proclamação da República visava principalmente derrubar a monarquia e estabelecer um regime republicano no Brasil.', 'easy'),

('História', 'Segunda Guerra Mundial', 'O que representou o Dia D durante a Segunda Guerra Mundial?', 
 '["A rendição da Alemanha nazista", "O ataque japonês a Pearl Harbor", "A invasão aliada na Normandia, França", "A primeira bomba atômica no Japão"]', 
 2, 'O Dia D foi a invasão aliada na Normandia, França, em 6 de junho de 1944, marco decisivo da guerra.', 'easy'),

('História', 'Ditadura Militar', 'Durante a Ditadura Militar no Brasil (1964-1985), qual foi a principal característica do AI-5?', 
 '["Suspensão de direitos políticos e liberdades individuais", "Criação do sistema bipartidário ARENA-MDB", "Estabelecimento da censura prévia aos meios de comunicação", "Implementação do milagre econômico"]', 
 0, 'O AI-5 foi o mais autoritário dos Atos Institucionais, suspendendo direitos políticos e liberdades individuais.', 'medium'),

('História', 'Revolução Francesa', 'Qual foi o impacto social mais significativo da Revolução Francesa (1789-1799)?', 
 '["A consolidação do poder da nobreza", "O fortalecimento da Igreja Católica", "A abolição do sistema feudal e privilégios aristocráticos", "A expansão territorial francesa na Europa"]', 
 2, 'A Revolução Francesa aboliu o sistema feudal e os privilégios aristocráticos, transformando a sociedade francesa.', 'medium'),

('História', 'Brasil Colonial', 'O quilombo de Palmares representou, no período colonial brasileiro:', 
 '["Apenas uma forma de resistência passiva dos escravos", "Um modelo alternativo de organização social e econômica", "Uma aliança entre escravos e senhores de engenho", "Uma estratégia portuguesa de controle territorial"]', 
 1, 'Palmares foi um modelo alternativo de organização social e econômica, demonstrando a capacidade de autogovernança dos africanos e seus descendentes.', 'hard');