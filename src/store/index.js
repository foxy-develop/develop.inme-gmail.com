import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import user from "./modules/user";
import charts from "./modules/charts";
import map from "./modules/charts-map";
import AxiosPlugin from "vue-axios-cors";

Vue.use(Vuex);
Vue.use(AxiosPlugin);

export default new Vuex.Store({
  modules: {
    auth, user, charts, map
  },
  strict: true
});
