
# Scripts de Geração de Conteúdo Educacional

Este diretório contém scripts para popular o banco de dados do EduGameIA Plus com conteúdo educacional detalhado e quizzes gerados automaticamente por IA.

## Arquivos

### `educationalContent.ts`
Contém toda a estrutura de dados com o conteúdo educacional organizado por:
- Matérias (Matemática, Física, Química, Biologia, História, Geografia, Português, Sociologia)
- Temas dentro de cada matéria
- Tópicos com explicações detalhadas

### `seedDatabase.ts`
Script principal que:
1. Processa todo o conteúdo educacional
2. Insere os dados na tabela `subject_contents`
3. Usa IA (OpenAI) para gerar quizzes baseados no conteúdo
4. Insere as questões na tabela `subject_questions`
5. Gera um arquivo SQL completo para execução

## Como usar

### Pré-requisitos
- Chave da API OpenAI
- Acesso ao projeto Supabase
- Node.js instalado

### Passos para execução

1. **Instalar dependências** (se necessário):
```bash
npm install
```

2. **Executar o script**:
```typescript
// No arquivo seedDatabase.ts, descomente a última linha:
runSeedScript();

// Depois execute:
npx ts-node scripts/seedDatabase.ts
```

3. **Fornecer a chave da API**:
- O script solicitará sua chave da OpenAI
- Digite a chave quando solicitado

4. **Aguardar a geração**:
- O script processará todas as matérias
- Gerará quizzes para cada tópico
- Criará o SQL final

5. **Executar no Supabase**:
- Copie todo o SQL gerado
- Acesse o editor SQL do Supabase
- Execute o script completo

## Estrutura do conteúdo gerado

### Tabela `subject_contents`
- Conteúdos teóricos detalhados
- Organizados por matéria e tema
- Explicações completas para cada tópico

### Tabela `subject_questions`
- Questões de múltipla escolha
- Geradas automaticamente por IA
- Baseadas no conteúdo dos tópicos
- Formato compatível com o ENEM

## Características dos quizzes gerados

- **5 questões por tópico**
- **4 alternativas por questão**
- **Contextualização ENEM**
- **Baseados exclusivamente no conteúdo fornecido**
- **Nível de dificuldade adequado**

## Personalização

Para adicionar mais conteúdo:

1. Edite `educationalContent.ts`
2. Adicione novos tópicos com explicações
3. Execute novamente o script
4. O novo conteúdo será incluído no SQL gerado

## Observações importantes

- O script faz pausas entre chamadas da API para evitar rate limiting
- Erros individuais não interrompem o processo geral
- Todo o SQL é gerado antes da execução
- Recomenda-se testar com poucos tópicos primeiro

## Solução de problemas

### Erro de API OpenAI
- Verifique se a chave está correta
- Confirme se há créditos disponíveis
- Aguarde alguns segundos entre tentativas

### Erro de JSON inválido
- A IA às vezes retorna formato incorreto
- O script continuará com outros tópicos
- Revise manualmente os casos que falharam

### Erro no Supabase
- Verifique as permissões da tabela
- Confirme se as migrações foram executadas
- Teste o SQL em pequenos blocos
