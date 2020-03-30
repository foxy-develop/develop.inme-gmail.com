import Vue from 'vue'
import Router from 'vue-router'
import { TokenService } from "../services/storage.service";
import store from "../store";

Vue.use(Router);
const Home = () => import("../views/Home");
const About = () => import("../views/About");
const Login = () => import("../views/Login");

const ifError = (to, from, next) => {
  if (TokenService.get()) {
    next("/");
    return;
  }
  next("/login");
};


const routes = [
  {
    path: "/",
    name: "Home",
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
    component: Login
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV ==="/",
  routes
});



router.beforeEach((to, from, next) => {
  console.log(store.getters.isAuthenticated)
  if (to.name !== 'Login' && !store.getters.isAuthenticated) next({ name: 'Login' });
  if (to.name === 'Login' && store.getters.isAuthenticated) next({ name: 'Home' });
  else next()
})


export default router
