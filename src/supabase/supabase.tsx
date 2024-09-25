import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Define types for your environment variables to ensure type safety
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create a Supabase client with typed values
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
