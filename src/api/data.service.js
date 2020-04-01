import ApiService from "../services/api.service";
import { API_DATA } from "./api.endpoints";

class DataError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const prepareData = {
  charts: response => {
    return {
      labels: response.data.statistics.dates,
      positive: {
        data: response.data.statistics.positive.values,
        total: {
          domains: response.data.statistics.positive.total_domains,
          links: response.data.statistics.positive.total_links
        }
      },
      negative: {
        data: response.data.statistics.negative.values,
        total: {
          domains: response.data.statistics.negative.total_domains,
          links: response.data.statistics.negative.total_links
        }
      }
    };
  },
  map: response => {
    const formatData = response.data.stats.map(el => {
      return {
        id: el.country_short_title_ru != 'HK' ? el.country_short_title_ru : 'CN',
        name: el.country_short_title_ru != 'HK' ? el.country_title_ru : 'Китай'  ,
        value: el.total,
        value_negative: el.total_negative,
        region_id: el.id_country
      };
    });
    return formatData;
  }
};

const DataServive = {
  getChartsData: async period => {
    try {
      const response = await ApiService.get(API_DATA.CHARTS_BY_PERIOD + period);
      if (response && response.status && response.status == 200) {
        return { status: response, data: prepareData.charts(response) };
      }
    } catch (error) {
      throw new DataError(error.response.status, error.response.data.detail);
    }
  },
  getMapData: async period => {
    try {
      const response = await ApiService.post(API_DATA.MAP_DATA, { period: period });
      if (response && response.status && response.status == 200) {
        return { status: response, data: prepareData.map(response) };
      }
    } catch (error) {
      throw new DataError(error.response.status, error.response.data.detail);
    }
  },
  getCurrentData: async (type, period) => {
    try {
      const response = await ApiService.post(API_DATA.CURRENT_MENTIONS, {
        type: type,
        period: period
      });
      if (response && response.status && response.status == 200) {
        return { status: response.status, data: response.data };
      }
    } catch (error) {
      throw new DataError(error.response.status, error.response.data.detail);
    }
  }
};


export default DataServive;
export { DataServive, DataError };
