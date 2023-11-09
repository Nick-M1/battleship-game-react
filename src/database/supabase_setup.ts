import {createClient} from "@supabase/supabase-js";
import {Database} from "./supabase.ts";

export const supabase =
    createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_APIKEY, { db: { schema: 'battleships' } });
