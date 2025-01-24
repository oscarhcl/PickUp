import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nddyokboixdpybuvswaw.supabase.co';
const supabaseAnonKey = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZHlva2JvaXhkcHlidXZzd2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMzQ0NDUsImV4cCI6MjA1MjkxMDQ0NX0.B-yX-xQMWuBAqFMR0hqu7BMQkqQEIIJutBnEl3-Mi2E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});