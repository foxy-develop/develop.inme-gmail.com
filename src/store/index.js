import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import user from "./modules/user";
import AxiosPlugin from "vue-axios-cors";

Vue.use(Vuex);
Vue.use(AxiosPlugin);

export default new Vuex.Store({
  modules: {
    auth, user
  },
  strict: true
});
