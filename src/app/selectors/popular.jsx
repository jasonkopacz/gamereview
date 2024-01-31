import { supabase } from "../database";

const { error, data: games} = await supabase
    .from('games')
    .select('*')