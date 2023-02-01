import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect } from '@sveltejs/kit';


export async function load(event){
    const { session, supabaseClient } = await getSupabase(event);
    const id = event.params.id;
    if (!session) {
        throw redirect(303, '/');
    }
    const { data, error } = await supabaseClient.from('seta').select('libri, partecipanti, nome, id').eq('id', id);
    if(error) return fail(404, {
        error: 'Nessun gruppo trovato'
    });
    let users = []
    for(const user of data[0].partecipanti){
        var { data:data2, error:error2 } = await supabaseClient.from('profiles').select('username').eq('id', user);
        users.push({username: data2[0].username, id: user})
    }

    return {
        group: data[0],
        users: users
    }
}