import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { routes } from './routes';

const vueRouter = new VueRouter({
  mode: 'history',
  routes
});

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: vueRouter
}).$mount("#app");
