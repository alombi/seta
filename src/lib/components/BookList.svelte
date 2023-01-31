<script>
    export let books = [];
</script>

{#if books.length > 0}
    {#each books as book}
    <a href={book.link} target="_blank">
    <div class="group">
        <small>{book.title} - {book.author}</small>
        <small>Aggiunto da {book.username}</small>
    </div>
    </a>
    <hr>
{/each}
{:else}
    <p class="not_found">Sembra non ci sia ancora nessun libro!</p>
{/if}


<style>
    .group{
        display: flex;
        justify-content: space-between;
    }
    .group:hover{
        opacity: 0.7;
}
</style>