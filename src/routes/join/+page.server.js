import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
}

export const actions = {
	join: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		const { request, url } = event;
		const formData = await request.formData();
		const id = formData.get('id');
		
		if(!id) return fail(400, {
			error: 'Inserisci un ID valido'
		});

		const userID = session.user.id;

		const { data, error } = await supabaseClient.from('seta').select('partecipanti').eq('id', id);
		let partecipanti = data[0].partecipanti
		partecipanti.push(userID)
		const { data: data2, error: error2 } = await supabaseClient.from('seta').update({partecipanti: partecipanti}).eq('id', id);
		if(error2) return fail(500, {
			error: 'Errore nel server. Riprova più tardi'
		});

		throw redirect(303, '/group/' + id);
	},
}