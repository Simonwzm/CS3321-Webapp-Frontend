<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <header style="width: 100%;"> -->
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/mainpage">MainPage</RouterLink>
      </nav>
    </div> -->
    <!-- <div style="width:100%;">

    </div>
  </header> -->

<n-message-provider>
  <RouterView style=""/>
</n-message-provider>
</template>

<style >

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

body {
  background-image: url(./assets/bluebg.jpg);
  /* full size backgroud, no repeat */
  /* background-size:  */
  /* background-size: 100% 100%; */
  background-attachment: fixed;

  background-size: contain;
  background-repeat: no-repeat;
  /* width: 100vw;
  height: 100vh; */
  /* z-index: 10; */
}


/* RouterView {
  display: block;
  margin: 0 auto;
  width: 100vw;
  height: 100%;

} */
/* header {
  line-height: 1.5;
  max-height: 100vh;
} */
/* 
RouterView {
  display: block;
  margin: 0 auto;
  width: 100vw;
  height: 100%;
} */

/* .logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
