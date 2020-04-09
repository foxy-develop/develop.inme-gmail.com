import Vue from 'vue'
import Router from 'vue-router'
import { TokenService } from "../services/storage.service";
import store from "../store";
import {NOTIFICATIONS_REQUEST} from "../store/actions/notifications";

Vue.use(Router);

const Dashboard = () => import(/* webpackChunkName: "Dashboard" */"../views/Dashboard");
const Login = () => import(/* webpackChunkName: "Period" */"../views/Login");
const Mentions = () => import(/* webpackChunkName: "Results" */"../views/Mentions");
const Negative = () => import(/* webpackChunkName: "Negative" */"../views/Negative");
const Reports = () => import(/* webpackChunkName: "Reports" */"../views/Reports");
const ReportCurrent = () => import(/* webpackChunkName: "ReportCurrent" */"../components/reports/ReportCurrent");
const ReportsList = () => import(/* webpackChunkName: "ReportsList" */"../components/reports/ReportsList");

const Current = () => import(/* webpackChunkName: "Period" */"../views/Current");

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
    component: Reports,
    children: [
      {
        path: '',
        name: "Reports",
        component: ReportsList
      },
      {
        path: ':id',
        name: "Report",
        component: ReportCurrent
      }
    ]
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
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});



router.beforeEach((to, from, next) => {
  if( store.getters.isAuthenticated ) store.dispatch(NOTIFICATIONS_REQUEST);
  if (to.name !== 'Login' && !store.getters.isAuthenticated) next({ name: 'Login' });
  if (to.name === 'Login' && store.getters.isAuthenticated) next({ name: 'Dashboard' });
  else next()
})


export default router
