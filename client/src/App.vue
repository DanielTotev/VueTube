<template>
  <div id="app" class="container-fluid">
    <Navigation />
    <hr>
      <router-view></router-view>
    <hr>
    <Footer />
  </div>
</template>

<script>
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";

export default {
  name: "app",
  components: {
    Navigation,
    Footer
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
