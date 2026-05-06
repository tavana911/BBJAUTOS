import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avjajpkmakddnjthrgrf.supabase.co';
const supabaseAnonKey = 'sb_publishable_C861jC1Fy5tACGI4R7BGzw_wjDFiowV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

