import axios from "axios";
import { TokenService } from "./storage.service";

const ApiService = {
  init(init) {
    axios.defaults.baseURL = init.BASE_URL;
    axios.defaults.headers.common[init.API_HEADER] = init.API_KEY;

  },

  setHeader() {
    axios.defaults.headers.common["Access-Token"] = `${TokenService.get()}`;
  },

  removeHeader() {
    axios.defaults.headers.common["Access-Token"] = {};
  },

  get(source) {
    return axios.get(source);
  },

  post(source, data) {
    return axios.post(source, data);
  },

  custom(data) {
    return axios(data);
  }
};

export default ApiService;
