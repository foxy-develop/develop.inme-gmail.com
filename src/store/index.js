import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth.js";
import AxiosPlugin from "vue-axios-cors";

Vue.use(Vuex);
Vue.use(AxiosPlugin);

export default new Vuex.Store({
  modules: {
    auth
  },
  strict: true
});
