<script>
    import { Settings, Plus, X } from 'lucide-svelte';
    import { page } from '$app/stores';
    import BookList from '$lib/components/BookList.svelte';
    export let data;
    $: ({ group, users } = data);

    function openSettings(){
        const dialog = document.querySelector('dialog');
        dialog.setAttribute("open", "true")
    }
    function closeSettings(){
        const dialog = document.querySelector('dialog');
        dialog.removeAttribute("open")
    }
</script>

<div class="titleflex">
    <h1>{group.nome}</h1>
    <div>
        <a id="plus" role="button" href={$page.url.pathname + '/new'} ><Plus /></a>
        <a on:click={openSettings} class="secondary" href="#"><Settings /></a>
    </div>
</div>
<BookList books={group.libri} />



<dialog>
    <article>
      <div class="titleflex">
        <h3>Impostazioni</h3>
        <a class="secondary" on:click={closeSettings} href="#cancel"><X /></a>
      </div>
      <article>
        <p>Link d'invito: <kbd>https://seta.alombi.xyz/invite?id={group.id}</kbd></p>
        <p>ID del gruppo <kbd>{group.id}</kbd></p>
      </article>
      <hr>
      <p>Nel gruppo {group.nome} ci sono {group.partecipanti.length} partecipanti:</p>
      <div class="users">
        {#each users as user}
            <a href="#">{user.username}</a>
        {/each}   
      </div>
      <footer>
        <a role="button" href={"/group/" + group.id + '/quit?id=' + group.id} class="error">Esci dal gruppo</a>
        <a on:click={closeSettings} href="#cancel" role="button" class="secondary">Chiudi</a>
      </footer>
    </article>
</dialog>


<style>
    #plus {
        border-radius: 50%;
        padding: 0px;
        margin-right: 10px;
    }
    .titleflex{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .titleflex > h1, .titleflex > h3 {
        margin-bottom: unset;
    }
    .users{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: left;
    }
</style>
