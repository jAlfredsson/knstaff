import Router from "vue-router";
import store from '@store';
import Login from "@pages/Login.vue";
import Register from "@pages/Register.vue";
import Offers from "@pages/Offers.vue"
import ForgotPassword from "@pages/ForgotPassword.vue";
import ResetPassword from "@pages/ResetPassword.vue";
import EmailConfirm from '@pages/EmailConfirm.vue'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}
//offers, upcoming, past, messenger, settings

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/offers",
    },
    {
      path: "/offers",
      component: Offers,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/register",
      component: Register,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/passwords/email",
      component: ForgotPassword,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/passwords/reset/:token",
      component: ResetPassword,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/emails/confirm/:token",
      component: EmailConfirm
    }
  ]
});
