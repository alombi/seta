<script>
    import { page } from '$app/stores'
    import { AlertTriangle } from 'lucide-svelte'
    export let form
    export let data
    $: ({ username, groups, afterID } = data);
    
</script>

{#if $page.data.session}
<h1>Bentornato {username}</h1>
    {#if groups.length > 0}
        {#each groups as group}
            <div class="group">
                <a href="/group/{group.id}">{group.nome}</a>
                <small>{group.partecipanti.length} partecipanti</small>
            </div>
            <hr>
        {/each}
    {:else}
    <p class="not_found">Non ti sei ancora unito a nessun gruppo!</p>
    <div>
        <form method="post" action="?/join">
            <input type="text" id="id" name="id" placeholder="ID del gruppo" required>
            <button class="contrast" type="submit">Entra</button>
            <small>Oppure <a href="/new">creane uno</a></small>
        </form>
    </div>
    {/if}
{:else}
    <h1>Login</h1>
    {#if form?.error}
        <button class="error"><AlertTriangle /> {form?.error}</button>
    {/if}
    <form method="post" action="?/login">
        <div class="grid">
            <label for="nome">
                Email
                <input type="email" id="email" name="email" placeholder="Email" required>
            </label>

            <label for="password">
                Password
                <input type="password" id="password" name="password" placeholder="Password" required>
            </label>
            <input type="text" id="afterID" name="afterID" value={afterID} style="display:none;">
        </div>
        <button type="submit">Entra</button>
        <p><small>Non hai un account? <a href="/signup">Creane uno qui</a></small></p>
    </form>
{/if}


<style>
    h1{
        margin-bottom: 20px;
    }
    .group{
        display: flex;
        justify-content: space-between;
    }
    .group:hover{
        opacity: 0.7;
}
</style>