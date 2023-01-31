import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
}

export const actions = {
    add: async (event) => {
        const { session, supabaseClient } = await getSupabase(event);
        const { request, url } = event;
		const formData = await request.formData();
        const id = event.params.id

        const userID = session.user.id
        let { data: usernameData, error:usernameError } = await supabaseClient.from('profiles').select('username').eq('id', userID)
        let username = usernameData[0].username
        
        const title = formData.get('titolo');
        const author = formData.get('autore');
        const link = formData.get('link');

		const { data, error } = await supabaseClient.from('seta').select('libri').eq('id', id);
        let books = data[0].libri
        books.push({title: title, author: author, link: link, username: username})
        const { data: data2, error: error2 } = await supabaseClient.from('seta').update({libri: books}).eq('id', id);

        if(error2) return fail(500, {
			error: 'Errore nel server. Riprova più tardi'
		});

		throw redirect(303, '/group/' + id);
    }
}