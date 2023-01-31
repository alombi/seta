<script>
    import { AlertTriangle } from 'lucide-svelte'
    export let form
</script>

<h1>Unisciti ad un nuovo gruppo</h1>

{#if form?.error}
    <button class="error"><AlertTriangle /> {form?.error}</button>
{/if}
<div class="grid">
    <form method="post" action="?/create">
        <label for="nome">
            <h4>Crea</h4>
            <input type="text" id="nome" name="nome" placeholder="Nome del gruppo" required>
        </label>
        <button type="submit">Crea</button>
    </form>
    <form method="post" action="?/join">
        <label for="id">
            <h4>Unisciti</h4>
            <input type="text" id="id" name="id" placeholder="ID del gruppo" required>
        </label>
        <button class="contrast" type="submit">Unisciti</button>
    </form>
</div>