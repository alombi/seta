<script>
    import { X } from 'lucide-svelte'
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
    <small>{book.title} - {book.author}</small>
    <small>Aggiunto da {book.username}</small>
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
        {/if}
        <br>
        <button on:click={()=>window.open(book.link, '_blank')}>Link al libro</button>
    </article>
</dialog>



<style>
    .group{
        display: flex;
        justify-content: space-between;
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
</style>