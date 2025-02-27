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

export async function getAccount() {
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw authError || new Error("User not found");
  return user;
}

export async function getCurrentUser() {
  try {
    const userUser = await getAccount();
    const user = userUser.user // Call the JS function to get the user
    // Fetch the user's profile from the 'profiles' table
    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    return {userProfile }; //return profile
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function fetchProfile() {
  try {
    const data = await getCurrentUser();  // Call the JS function to get the profile
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error loading user");
    return null;
  }
}