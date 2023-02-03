<script>
    import { Plus, ChevronLeft } from 'lucide-svelte';
    import { page } from '$app/stores'
    import { navButton, navLink } from '$lib/stores';

</script>

<nav>
    <ul>
      {#if $page.data.session}
      {#if $navButton == 'plus'}
        <li><a id="plus" role="button" href={$navLink} class=""><Plus /></a></li>
      {:else if $navButton == 'back'}
        <li><a id="plus" role="button" href={$navLink} class=""><ChevronLeft /></a></li>
      {/if}
      {/if}
      <li><strong><a href="/">seta</a></strong></li>
    </ul>
    <ul>
      <li>
        {#if $page.data.session}
          <form id="authform" action="/logout" method="post">
            <a class="button" role="button" href="" onclick="this.closest('form').submit();return false;">Logout</a>
          </form>
        {/if}
      </li>
    </ul>
</nav>

<style>
    #plus {
      padding: 0px;
      border-radius: 50%;
    }
    #authform{
      margin-bottom: unset;
    }
    .button{
      padding-top: 6px;
      padding-bottom: 5px;
      font-size: 17px;
    }
</style>