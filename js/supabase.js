
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Your Supabase project details
const SUPABASE_URL = "https://ltvsyzuhdlkwrtdqlcif.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_IZDrJTf3cCsA_YW3j4LzIA_qysEmcEH";

// Create Supabase connection
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
