# WebJoas - Plataforma Profissional de Desenvolvimento Web

Website comercial de alto padrão e apresentação de serviços de criação de sites com metodologia moderna acelerada por Inteligência Artificial.

---

## Destaques do Projeto

- **Design Visual Executivo & Clássico**: Paleta em tons claros (branco, off-white, cinza claro) com contrastes em grafite escuro e azul-marinho.
- **Zero Emojis**: Rigor estético profissional com ícones vetoriais SVG de alta definição (Lucide Icons).
- **Modo Claro Padrão & Suporte a Modo Escuro**: Alternância instantânea com persistência local.
- **Multilíngue Completo (i18n)**: Suporte dinâmico a Português (PT), Inglês (EN) e Espanhol (ES).
- **Painel Administrativo Completo e Protegido**:
  - Edição de Textos, Títulos, Subtítulos e Botões em todos os idiomas.
  - CRUD de Serviços, Diferenciais e Projetos do Portfólio.
  - Ativação/desativação e reordenação de seções.
  - Gerenciador de Leads e solicitações de orçamento recebidas.
  - Configurações de SEO e Meta Tags.
- **Arquitetura Econômica com Supabase**:
  - Armazenamento em lote via JSONB com consumo mínimo de cota.
  - Zero polling ou listeners contínuos desnecessários.
  - Cache local inteligente (`localStorage`) com fallback offline funcional.
  - Script SQL com Row Level Security (RLS) em `supabase/schema.sql`.
- **Pronto para Vercel e GitHub**: Roteamento SPA configurado em `vercel.json`.

---

## Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Compilar bundle de produção
npm run build
```

---

## Acesso ao Painel Administrativo

1. Acesse o site no navegador (`http://localhost:5173`).
2. Role até o rodapé e clique em **"Painel Administrativo"** (ou clique no atalho do menu).
3. Insira a senha mestra padrão:
   - **Senha inicial:** `admin123`

---

## Configuração do Supabase

1. Crie um projeto gratuito no [Supabase](https://supabase.com).
2. Abra o **SQL Editor** do Supabase e execute o conteúdo do arquivo [`supabase/schema.sql`](file:///d:/WebJoas/supabase/schema.sql).
3. No painel administrativo do site, acesse a aba **"Supabase & Banco"** e insira:
   - **Project URL**
   - **Anon / Public Key**
4. Clique em **"Testar & Sincronizar"**. O site passará a sincronizar automaticamente em nuvem!

---

## Deploy na Vercel

1. Envie o repositório para o seu **GitHub**.
2. Conecte o repositório na **Vercel**.
3. O build (`npm run build`) e a rota SPA configurada em [`vercel.json`](file:///d:/WebJoas/vercel.json) funcionarão automaticamente.
