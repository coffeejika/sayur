import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gcqidtedhrfeckdobunp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcWlkdGVkaHJmZWNrZG9idW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NjY4NjQsImV4cCI6MjA4MzM0Mjg2NH0.SDAtkx3UADUrlI3HeZZqD_gykmU6hOLXA-tWGcQEmTo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);