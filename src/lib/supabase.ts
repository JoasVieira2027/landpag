import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from environment or dynamic configuration
const getCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const storageUrl = localStorage.getItem('webjoas_supabase_url');
  const storageKey = localStorage.getItem('webjoas_supabase_key');

  const supabaseUrl = storageUrl || envUrl || '';
  const supabaseKey = storageKey || envKey || '';

  return { supabaseUrl, supabaseKey };
};

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const { supabaseUrl, supabaseKey } = getCredentials();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (cachedClient && lastUrl === supabaseUrl && lastKey === supabaseKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'x-application-name': 'webjoas-showcase'
        }
      }
    });
    lastUrl = supabaseUrl;
    lastKey = supabaseKey;
    return cachedClient;
  } catch (err) {
    console.warn('Erro ao inicializar cliente Supabase:', err);
    return null;
  }
};

export const isSupabaseConfigured = (): boolean => {
  const { supabaseUrl, supabaseKey } = getCredentials();
  return Boolean(supabaseUrl && supabaseKey);
};

export const saveSupabaseCredentials = (url: string, key: string) => {
  if (url && key) {
    localStorage.setItem('webjoas_supabase_url', url.trim());
    localStorage.setItem('webjoas_supabase_key', key.trim());
    cachedClient = null;
  } else {
    localStorage.removeItem('webjoas_supabase_url');
    localStorage.removeItem('webjoas_supabase_key');
    cachedClient = null;
  }
};
