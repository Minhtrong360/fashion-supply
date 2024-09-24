import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-anon-key"; // Use your Supabase API key here
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
