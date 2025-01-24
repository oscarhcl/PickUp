import {supabase} from "./supabaseClient"

export async function getCurrentUser() {
    try {
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error("User not found");
  
      // Fetch the user's profile from the 'profiles' table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.user.id)
        .single();
  
      if (profileError) throw profileError;
  
      return {profile }; // Merging user and profile data
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }