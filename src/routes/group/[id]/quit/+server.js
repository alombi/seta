import { json, redirect } from "@sveltejs/kit"
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export async function GET( event ){
    const { session, supabaseClient } = await getSupabase(event);
    const id = event.params.id;
    const { data, error } = await supabaseClient.from('seta').select('partecipanti').eq('id', id)
    const userID = session.user.id;
    
    let partecipanti = data[0].partecipanti.filter(user => user != userID)
    const { data: data2, error: error2 } = await supabaseClient.from('seta').update({partecipanti: partecipanti}).eq('id', id);
    
    throw redirect(303, '/');
    
}

