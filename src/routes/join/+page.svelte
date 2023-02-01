<script>
    import { AlertTriangle } from 'lucide-svelte'
    export let form
</script>

<h1>Unisciti ad un gruppo</h1>

{#if form?.error}
    <button class="error"><AlertTriangle /> {form?.error}</button>
{/if}
<div class="grid">
    <form method="post" action="?/join">
        <label for="id">
            <input type="text" id="id" name="id" placeholder="ID del gruppo" required>
        </label>
        <button class="contrast" type="submit">Unisciti</button>
        <small>Oppure  <a href="/new">creane uno</a></small>
    </form>
</div>