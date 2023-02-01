import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';


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
  login: async (event) =>{
        const { request, cookies, url } = event
        const { session, supabaseClient } = await getSupabase(event)
        const formData = await request.formData()
    
        const email = formData.get('email')
        const password = formData.get('password')
        const afterID = formData.get('afterID')
    
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        })
    
        if (error) {
          if (error instanceof AuthApiError && error.status === 400) {
            return fail(400, {
              error: 'Credenziali non valide',
              values: {
                email,
              },
            })
          }
          return fail(500, {
            error: 'Errore nel server. Riprova più tardi',
            values: {
              email,
            },
          })
        }
        if(!error && afterID != 0){
          throw redirect(303, '/invite?id=' + afterID)
        }
    }
}

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    let id = session.user.id

    let { data: usernameData, error:usernameError } = await supabaseClient.from('profiles').select('username').eq('id', id)
    let username = usernameData[0].username

    const { data, error } = await supabaseClient.from('seta').select('*')
    let groups = data
    groups = groups.filter((group)=>{
      return group.partecipanti.includes(id)
    })

    return {
      username,
      groups
    }
  }else{
    if(event.url.searchParams.get('after') == 'invite'){
      return {
        afterID: event.url.searchParams.get('id')
      }
    }else{
      return { afterID: 0 }
    }
  }
}