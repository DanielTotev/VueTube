<template>
  <div id="app" class="container-fluid">
    <Navigation  :isLoggedIn="isLoggedIn" @logout="handleLogout"/>
    <hr>
      <router-view @login="handleLogin"></router-view>
    <hr>
    <Footer />
  </div>
</template>

<script>
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import { isAuthenticated, clearCredentials } from "./mixins/services/userService";

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: isAuthenticated
    }
  },
  components: {
    Navigation,
    Footer
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    },
    handleLogout() {
      this.isLoggedIn = false;
      clearCredentials();
      this.$router.history.push('login');
    }
  }
};
</script>

<style>
.bg-color-dark {
	background-color: #483D8B;
	color: #A9A9A9;
}

.footer {
	background-color: #483D8B;
	color: #A9A9A9;
}

.nav-item>a:hover, .navbar-brand:hover {
	color: #FFFFFF;
}

iframe {
	overflow:hidden;
}
</style>
