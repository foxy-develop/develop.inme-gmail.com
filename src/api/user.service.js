import ApiService from "../services/api.service";
import { ThemeService } from "../services/storage.service";
import { API_USER } from "./api.endpoints";

class UserError extends Error {
  constructor(errorCode, status) {
    super( status );
    this.name = this.constructor.name;
    this.status = status;
    this.errorCode = errorCode;
  }
}

const UserServive = {
  profile: async function() {
    try {
      const response = await ApiService.get( API_USER.PROFILE );
      if (response && response.status == 200) {
        response.data.status && ThemeService.save(response.data.profile.theme);
        return response.data;
      }
    } catch ( error ) {
      throw new UserError(error, false)
    }
  },
  theme: async function() {
    const theme = ThemeService.get() === "dark" ? "light" : "dark";
    ThemeService.save(theme);
    try {
      const response = await ApiService.post(API_USER.SWITCH_THEME, {theme});
      if (response && response.data.status) {
        throw new UserError(error.response.status, error.response.data.detail)
      }
    } catch ( error ) {
      throw new UserError(error, false)
    }
  }
}

export default UserServive;
export { UserServive, UserError };
