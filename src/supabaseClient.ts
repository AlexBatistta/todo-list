import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slqhfgkjbqlfjesntgub.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNscWhmZ2tqYnFsZmplc250Z3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNzcwMjIsImV4cCI6MjA2Mzc1MzAyMn0.386hc7ZugIsgzI_4BzpNj7sfHVeGsgNEoSMTYfqOkEE';

export const supabase = createClient(supabaseUrl, supabaseKey);
