<script>
    import { Users } from 'lucide-svelte';
    import { page } from '$app/stores'

</script>

<nav>
    <ul>
      {#if $page.data.session}
        <li><a id="plus" role="button" href="/new" class=""><Users /></a></li>
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