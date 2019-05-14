<script>
  import { authenticated } from "../stores.js";
  import { logIn, logOut, getProfile } from "../auth.js";
</script>

<style>
  .nav-bar {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .nav-bar--over {
    box-shadow: 0 3px 10px -2px rgba(0, 0, 0, 0.2);
  }

  .nav-bar__logo {
    color: inherit;
    padding: 1rem 0;
    text-decoration: none;
  }
  .nav-bar__items {
    list-style: none;
    padding: 1rem 0;
  }

  .nav-bar__item {
    display: inline-block;
    text-decoration: none;
    margin-left: 1.5rem;
  }

  .nav-bar__link {
    text-decoration: none;
  }
  .nav-bar__link:hover {
    text-decoration: underline;
  }
</style>
<nav role="navigation" class="nav-bar">
  <h3><a href="/" class="nav-bar__logo">prk<span class="fg-accent">.</span></a></h3>
  <ul class="nav-bar__items">
    {#if $authenticated}
      <li class="nav-bar__item">Hi {getProfile().given_name}</li>
      <li class="nav-bar__item"><a href="/profile" class="nav-bar__link">profile</a></li>
      <li class="nav-bar__item"><a href="#" class="nav-bar__link" on:click={logOut}>log out</a></li>
    {/if}
    {#if !$authenticated}
      <li class="nav-bar__item"><a href="#" class="nav-bar__link" on:click={logIn}>log in</a></li>
    {/if}
  </ul>
</nav>