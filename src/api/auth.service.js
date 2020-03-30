import ApiService from "../services/api.service";
import { TokenService, StorageService } from "../services/storage.service";
import { API_AUTH } from "./api.endpoints";

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const AuthService = {
  auth: async function(phone) {
    try {
      const response = await ApiService.post(API_AUTH.GET_PASS, { phone });
      if (response && response.status == 200) {
        return response.data;
      }
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  login: async function(password, phone) {
    try {
      const response = await ApiService.post(API_AUTH.LOGIN, {
        password, phone});
      if (response.data) {
        if (response.data.status) {
          TokenService.save(response.data.token);
          ApiService.setHeader();
        }
        return response.data;
      } else {
        throw new AuthenticationError(
          response.data.status,
          response.data.message
        );
      }
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  logout: function() {
    const response = ApiService.get(API_AUTH.LOGOUT);
    StorageService.clear();
    ApiService.removeHeader();
    return response;
  }
};

export default AuthService;
export { AuthService, AuthenticationError };
