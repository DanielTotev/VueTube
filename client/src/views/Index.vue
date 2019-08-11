<template>
  <div class="jumbotron">
    <p class="h1 display-3">Welcome to MeTube&trade;!</p>
    <p class="h3">The simplest, easiest to use, most comfortable Multimedia Application.</p>
    <hr class="my-3" />
    <p>
      <router-link to="/login">Login</router-link> if you have an account or
      <router-link to="/register">Register</router-link> now and start tubing.
    </p>
  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style>
</style>
