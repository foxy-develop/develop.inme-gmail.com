import Vue from 'vue'
import Router from 'vue-router'
import { TokenService } from "../services/storage.service";
import store from "../store";

Vue.use(Router);

const Dashboard = () => import(/* webpackChunkName: "Dashboard" */"../views/Dashboard");
const Login = () => import(/* webpackChunkName: "Period" */"../views/Login");
const Mentions = () => import(/* webpackChunkName: "Results" */"../views/Mentions");
const Negative = () => import(/* webpackChunkName: "Negative" */"../views/Negative");
const Reports = () => import(/* webpackChunkName: "Reports" */"../views/Reports");
const Current = () => import(/* webpackChunkName: "Period" */"../views/Current");
const Report = () => import(/* webpackChunkName: "Report" */"../views/Report");
const Error = () => import(/* webpackChunkName: "Error" */"../views/Error");


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
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/negative",
    name: "Negative",
    component: Negative
  },
  {
    path: "/mentions",
    name: "Mentions",
    component: Mentions
  },
  {
    path: "/mentions/:type/:date",
    name: "Current",
    component: Current
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports
  },
  {
    path: "/reports/:id",
    name: "Report",
    component: Report
  },
  {
    path: "*",
    name: "Error",
    component: Error
  }
];

const router = new Router({
  mode: 'history',
  base: "./",
  routes
});



router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.isAuthenticated) next({ name: 'Login' });
  if (to.name === 'Login' && store.getters.isAuthenticated) next({ name: 'Dashboard' });
  else next()
})


export default router
