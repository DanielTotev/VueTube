<template>
  <div id="app" class="container-fluid">
    <Navigation  :isLoggedIn="isLoggedIn" @logout="handleLogout"/>
    <Message :text="message.text" :message-style="message.style" />
    <hr>
      <router-view @login="handleLogin" @message-show="handleMessageShow"></router-view>
    <hr>
    <Footer />
  </div>
</template>

<script>
import Message from "./components/common/Message";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import { messagingSetUp } from "./services/notificationService";
import { isAuthenticated, clearCredentials } from "./services/userService";
import { setTimeout } from 'timers';

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: isAuthenticated(),
    }
  },
  mixins: [messagingSetUp],
  components: {
    Navigation,
    Footer,
    Message
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    },
    handleLogout() {
      this.isLoggedIn = false;
      clearCredentials();
      this.$router.history.push('login');
    },

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
