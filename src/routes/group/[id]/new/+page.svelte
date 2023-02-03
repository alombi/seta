<script>
    import { Search } from 'lucide-svelte';
    // let q, qauthor;
    // let results = []
    // function continueForm(){
    //     document.getElementById('first-part').style.display = 'none'
    //     document.querySelector('.invisible').style.display = 'block'
    // }
    // async function search(){
    //     const reqUrl = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${q}&maxResults=10&printType=books&langRestrict=it`;
    //     let req = await fetch(reqUrl)
    //     let data = await req.json()
    //     data = data.items
    //     var dataFiltered = [];
    //     if(data){
    //         results = data
    //     }
    //     results = []
    // }
    import { page } from '$app/stores'
    import { navButton, navLink } from '$lib/stores';
    $navButton = 'back'
    $navLink = '/group/' + $page.params.id
</script>

<form method="post" action="?/add">
    <div id="first-part">
        <h1 id="first-part">Aggiungi un libro</h1>
        <div class="grid">
            <input type="text" name="titolo" id="titolo" placeholder="Titolo" required>
            <input type="text" name="autore" id="autore" placeholder="Autore" required>
        </div>
        <label for="note">
            <textarea name="note" id="note" cols="30" rows="4" placeholder="Annotazioni, note"></textarea>
        </label>
        <input type="link" name="link" id="link" placeholder="Link al libro" required>
    
        <!-- <button id="continua" on:click={continueForm}>Continua</button> -->
    </div>

    <!-- <div class="invisible">
        <h1>Scegli una copertina</h1>
        <div id="search">
            <input type="search" name="q" id="q" placeholder="Cerca libro" bind:value={q}>
            <button on:click={search} type="button"><Search /></button>
        </div>
        <div class="grid">
            <div class="grid">
                {#each results as result}
                    <article><img src={'https://books.google.com/books/content?id=' + result.volumeInfo.imageLinks.thumbnail.split('http://books.google.com/books/content?id=')[1]} alt=""></article>
                {/each} 
            </div>
            <select required name="" id=""></select>
        </div>
        <button type="submit">Aggiungi</button>
    </div> -->
    <button type="submit">Aggiungi</button>
</form>


<style>
    #search{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap:10px;
    }
    #search >input{
        min-width: 85%;
    }
    .invisible{
        display: none;
    }
    img{
        height: 110px;
    }
    .grid{
        margin-top: -10px;
        margin-bottom: 20px;
    }
</style>