import VueRouter from 'vue-router';
import { isAuthenticated } from './services/userService';
import { routes } from './routes';

const vueRouter = new VueRouter({
  mode: 'history',
  routes
});

vueRouter.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if(isAuthenticated()) {
        return next();
      } else {
        return next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        });
      }
    }

    if(to.matched.some(record => record.meta.guest)) {
      if(!isAuthenticated()) {
        return next();
      } else {
        return next({
          path: '/home',
          params: { nextUrl: to.fullPath }
        });
      }
    }

    next();
});

export default vueRouter;