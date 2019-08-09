<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-color-dark">
    <button
      class="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand h4" href="/">MeTube&trade;</a>

    <div class="collapse navbar-collapse justify-content-end row" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <template v-if="isLoggedIn">
          <li class="nav-item active col-md-3">
            <router-link class="nav-link h5" to="/home">Home</router-link>
          </li>
          <li class="nav-item active col-md-3">
            <a class="nav-link h5" href="/profile">Profile</a>
          </li>
          <li class="nav-item active col-md-3">
            <router-link class="nav-link h5" to="/video-upload">Upload</router-link>
          </li>
          <li class="nav-item active col-md-3">
            <a class="nav-link h5" href="#" @click.prevent="$emit('logout')">Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item active col-md-4">
            <router-link class="nav-link h5" to="/">Home</router-link>
          </li>
          <li class="nav-item active col-md-4">
            <router-link class="nav-link h5" to="/login">Login</router-link>
          </li>
          <li class="nav-item active col-md-4">
            <router-link class="nav-link h5" to="/register">Register</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navigation",
  props: {
    isLoggedIn: {
      required: true,
      type: Boolean
    }
  }
};
</script>

<style>
</style>
