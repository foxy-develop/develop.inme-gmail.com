import Vue from 'vue'
import Router from 'vue-router'
import { TokenService } from "../services/storage.service";
import store from "../store";

Vue.use(Router);

const Dashboard = () => import(/* webpackChunkName: "Dashboard" */"../views/Dashboard")
const About = () => import(/* webpackChunkName: "About" */"../views/About");
const Login = () => import(/* webpackChunkName: "Login" */"../views/Login");

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
    name: "Dashboard",
    component: Dashboard
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
  if (to.name !== 'Login' && !store.getters.isAuthenticated) next({ name: 'Login' });
  if (to.name === 'Login' && store.getters.isAuthenticated) next({ name: 'Dashboard' });
  else next()
})


export default router
