import { json, redirect } from "@sveltejs/kit"
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export async function GET( event ){
    const { session, supabaseClient } = await getSupabase(event);
    const id = event.url.searchParams.get('id');
    if (!session) {
        throw redirect(303, '/?after=invite&id=' + id);
    }
    const { data, error } = await supabaseClient.from('seta').select('partecipanti').eq('id', id)
    const userID = session.user.id;

    data[0].partecipanti.filter((user) => {
        if (user == userID) { throw redirect(303, '/group/' + id) }
    })
    let partecipanti = data[0].partecipanti
    partecipanti.push(userID)
    const { data: data2, error: error2 } = await supabaseClient.from('seta').update({partecipanti: partecipanti}).eq('id', id);
    throw redirect(303, '/group/' + id);
}

