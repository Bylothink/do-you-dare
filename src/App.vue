<template>
    <!--div id="nav">
        <RouterLink to="/">
            Home
        </RouterLink> |
        <RouterLink to="/about">
            About
        </RouterLink>
    </div-->
    <RouterView />
</template>

<style lang="scss">
  @import "@/assets/scss/main";

  #app
  {
    height: 100%;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
