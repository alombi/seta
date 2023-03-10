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
	create: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		const { request, url } = event;
		const formData = await request.formData();
		const nome = formData.get('nome');

		if(!nome) return fail(400, {
			error: 'Inserisci un nome valido'
		});

		const userID = session.user.id;
		const { data, error } = await supabaseClient.from('seta').insert({partecipanti: [userID], nome: nome}).select();
		if(error) return fail(500, {
			error: 'Errore nel server. Riprova più tardi'
		});

		throw redirect(303, '/group/' + data[0].id);
	}
}