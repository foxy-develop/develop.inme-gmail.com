import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueNumber from "vue-number-animation";

import ApiService from "./services/api.service";
import { TokenService } from "./services/storage.service";
import './constants/registerValues'


import VueMeta from 'vue-meta';
// import './registerServiceWorker';
// import wb from "./registerServiceWorker";

Vue.use(VueMeta);
Vue.use(VueNumber);

// Vue.prototype.$workbox = wb;
Vue.config.productionTip = false;

ApiService.init({
  BASE_URL: process.env.VUE_APP_API_BASE,
  API_HEADER: process.env.VUE_APP_API_HEADER,
  API_KEY: process.env.VUE_APP_API_KEY
});

if (TokenService.get()) {
  ApiService.setHeader();
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
