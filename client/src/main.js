import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import vueRouter from "./router";
import { notify } from "./services/notificationService";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.mixin(notify);

new Vue({
  render: h => h(App),
  router: vueRouter
}).$mount("#app");
