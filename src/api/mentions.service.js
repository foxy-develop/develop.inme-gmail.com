import ApiService from "../services/api.service";
import { API_DATA } from "./api.endpoints";

class MentionsError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}
const MentionsServive = {
  getMentions: async ({per_page, region_id, keyword_id}) => {
    try {
      const response = await ApiService.post(API_DATA.MENTIONS_LIST,  {
        per_page: per_page, region_id: region_id, keyword_id: keyword_id });
      if (response && response.status && response.status == 200) {
        return { status: response, data: response.data };
      }
    } catch (error) {
      throw new MentionsError(error.response.status, error.response.data.detail);
    }
  },
  getMentionsFilter: async () => {
    try {
      const response = await ApiService.get(API_DATA.MENTIONS_FILTER);
      if (response && response.status && response.status == 200) {
        return { status: response, data: response.data };
      }
    } catch (error) {
      throw new MentionsError(error.response.status, error.response.data.detail);
    }
  },
};


export default MentionsServive;
export { MentionsServive, MentionsError };
