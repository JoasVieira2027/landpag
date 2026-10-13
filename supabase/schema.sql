-- ==============================================================================
-- Schema SQL WebJoas - Supabase
-- Arquitetura Otimizada para Baixo Consumo, Alta Performance e Segurança (RLS)
-- ==============================================================================

-- 1. Habilitar extensão para UUIDs se necessário
create extension if not exists "uuid-ossp";

-- 2. Tabela de Configurações Gerais do Site (Single Row JSONB para consumo ultra-baixo)
create table if not exists public.site_config (
  id text primary key default 'main',
  settings jsonb not null default '{}'::jsonb,
  services jsonb not null default '[]'::jsonb,
  differentials jsonb not null default '[]'::jsonb,
  projects jsonb not null default '[]'::jsonb,
  process_steps jsonb not null default '[]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabela de Contatos e Solicitações de Orçamento (Leads)
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text not null,
  company text,
  project_type text not null,
  budget_range text,
  message text not null,
  status text not null default 'novo'
);

-- 4. Habilitar Row Level Security (RLS) em todas as tabelas
alter table public.site_config enable row level security;
alter table public.leads enable row level security;

-- ==============================================================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ==============================================================================

-- Política site_config: Qualquer visitante pode LER as configurações públicas
drop policy if exists "Permitir leitura pública das configurações" on public.site_config;
create policy "Permitir leitura pública das configurações"
  on public.site_config
  for select
  using (true);

-- Política site_config: Apenas usuários autenticados (Admin) podem salvar/atualizar
drop policy if exists "Permitir escrita apenas para admin autenticado" on public.site_config;
create policy "Permitir escrita apenas para admin autenticado"
  on public.site_config
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Política leads: Qualquer visitante pode ENVIAR (insert) solicitação de orçamento
drop policy if exists "Permitir inserção pública de leads" on public.leads;
create policy "Permitir inserção pública de leads"
  on public.leads
  for insert
  with check (true);

-- Política leads: Apenas o Administrador autenticado pode LER e GERENCIAR leads
drop policy if exists "Permitir leitura e gestão de leads apenas para admin" on public.leads;
create policy "Permitir leitura e gestão de leads apenas para admin"
  on public.leads
  for all
  using (auth.role() = 'authenticated');

-- ==============================================================================
-- Otimizações e Índices
-- ==============================================================================
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_status on public.leads (status);
