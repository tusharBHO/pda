// lib/supabaseClient.js

// import dotenv from "dotenv";
// dotenv.config(); // load .env variables

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);