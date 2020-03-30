import Vue from 'vue'
import Router from 'vue-router'
import { TokenService } from "../services/storage.service";

Vue.use(Router);
const Home = () => import("../views/Home");
const About = () => import("../views/About");
const Login = () => import("../views/Login");

const ifError = (to, from, next) => {
  if (TokenService.getToken()) {
    next("/");
    return;
  }
  next("/login");
};


const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      showUI: true,
      public: false,
      onlyWhenLoggedOut: false
    },
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      darkMode: true,
      public: true,
      onlyWhenLoggedOut: true
    },
    component: Login,
    props: { 'hideHeader': true }
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV ==="/",
  routes
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!TokenService.get();

  if (!isPublic && !loggedIn) {
    return next("/login");
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next("/");
  }

  next();
});

export default router
