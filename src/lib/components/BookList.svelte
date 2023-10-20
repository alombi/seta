<script>
    import { X, User, BookmarkCheck, BookmarkX } from 'lucide-svelte'
    export let book;
    import { supabaseClient } from '$lib/db'
    import {page} from '$app/stores'
    function openDialog(){
        let selector = `#id${book.bookID}`
        const dialog = document.querySelector(selector);
        dialog.setAttribute("open", "true")
        
    }
    function closeDialog(){
        let selector = `#id${book.bookID}`
        const dialog = document.querySelector(selector);
        dialog.removeAttribute("open")
    }
    let secondary = book.read

    async function markRead(){
        let groupID = $page.params.id
        const data1 = await supabaseClient.from('seta').select().eq('id', groupID)
        let newData = data1.data[0].libri.filter((item)=>{
            if (item.bookID == book.bookID) {item.read = true}
            return item
        })
        const { data, error } = await supabaseClient
        .from("seta")
        .update({ libri: newData})
        .eq('id', groupID)
        .select()
        window.location.reload()
    }
    async function removeBook(){
        let groupID = $page.params.id
        const data1 = await supabaseClient.from('seta').select().eq('id', groupID)
        let newData = data1.data[0].libri.filter((item)=>{
            return item.bookID != book.bookID
        })
        const { data, error } = await supabaseClient
        .from("seta")
        .update({ libri: newData})
        .eq('id', groupID)
        .select()
        window.location.reload()
    }
</script>


<a href="" on:click={()=>openDialog(book.id)} class:secondary>
<div class="group">
    <div id="left">
        <small>{book.title}</small>
        <small id="author">{book.author}</small>
    </div>
    <small id="username"><span id="usernameSPAN"><User size=18 /></span>{book.username}</small>
</div>
</a>
<hr>
<dialog id={'id'+book.bookID}>
    <article>
        <header>
            <a href="" aria-label="Close" class="close" on:click={closeDialog}></a>
            <b>{book.title}</b> di {book.author}
        </header>
        <p>Libro aggiunto da <mark>{book.username}</mark>.</p>
        {#if book.note}
        <article>
            {book.note}
        </article>
        {:else}
        <br>
        {/if}
        <button class="contrast" on:click={()=>window.open(book.link, '_blank')}>Link al libro</button>
        <div class="buttons">
            {#if book.read}
                <a role="button" href="#" class="secondary" disabled=true on:click={markRead}><BookmarkCheck />Letto</a>
            {:else}
                <a role="button" href="#" class="" on:click={markRead}><BookmarkCheck />Letto</a>
            {/if}
            <a role="button" href="#" class="" on:click={removeBook}><BookmarkX />Rimuovi</a>
        </div>
    </article>
</dialog>



<style>
    article{
        min-width: 35%;
    }
    .buttons{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap:10px;
    }
    .buttons a{
        width:90%;
    }
    .secondary{
        text-decoration: none;
    }
    .group{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .group:hover{
        opacity: 0.7;
    }
    .titleflex{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .titleflex > h3 {
        margin-bottom: unset;
    }
    #left{
        display: flex;
        flex-direction: column;
    }
    #left > #author{
        font-size: 13px;
    }
</style>