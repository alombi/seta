<script>
    import { Settings, Plus, ArrowUpNarrowWide, ArrowDownNarrowWide } from 'lucide-svelte';
    import { page } from '$app/stores';
    import BookList from '$lib/components/BookList.svelte';
    export let data;
    $: ({ group, users } = data);
    import { navButton, navLink } from '$lib/stores';
    import { onMount } from 'svelte';
    $navButton = 'back'
    $navLink = '/'

    function openSettings(){
        const dialog = document.querySelector('#impostazioni');
        dialog.setAttribute("open", "true")
    }
    function closeSettings(){
        const dialog = document.querySelector('#impostazioni');
        dialog.removeAttribute("open")
    }
    let recentFirst = true, books = []

    function changeOrder(){
        books = books.reverse()
        recentFirst = !recentFirst
    }
    onMount(()=>{
        books = group.libri.reverse()
    })
</script>
<div class="titleflex">
    <h1>{group.nome}</h1>
    <div>
        <a id="plus" role="button" href={$page.url.pathname + '/new'} ><Plus /></a>
        <a href="#" id="plus" on:click={changeOrder} role="button">
            {#if recentFirst}<ArrowUpNarrowWide />
            {:else}<ArrowDownNarrowWide />
            {/if}
        </a>
        <a on:click={openSettings} class="secondary" href="#"><Settings /></a>
    </div>
</div>

{#if group.libri.length > 0}
    {#each books as book}
        <BookList book={book} />
    {/each}
{:else}
    <p class="not_found">Sembra non ci sia ancora nessun libro!</p>
{/if}



<dialog id="impostazioni">
    <article>
      <header>
        Impostazioni
        <a on:click={closeSettings} href="#close" aria-label="Close" class="close"></a>
      </header>
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
    kbd::selection{
        background-color: #00897b;  
    }
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
