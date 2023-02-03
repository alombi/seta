<script>
    import { X, User } from 'lucide-svelte'
    import { space } from 'svelte/internal';
    export let book;
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
</script>


<a href="" on:click={()=>openDialog(book.id)}>
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
            {book.title}, di {book.author}
        </header>
        <p>Libro aggiunto da <mark>{book.username}</mark>.</p>
        {#if book.note}
        <article>
            {book.note}
        </article>
        {:else}
        <br>
        {/if}
        <button on:click={()=>window.open(book.link, '_blank')}>Link al libro</button>
    </article>
</dialog>



<style>
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