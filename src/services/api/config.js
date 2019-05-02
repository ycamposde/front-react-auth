import Page from './page';

export default {
  constants: {
    url_api: Page.constants.url_api
  },
  methods: {
    checkStatus: function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error('HTTP Error ${response.statusText}');
        error.status = response.statusText;
        error.response = response;
        throw error;
      }
    },
    parseJSON: function (response) {
      return response.json();
    },
    error: function (error) {
      if (error.response) {
        return error.response.json();
      }
      return [];
    }
  }
}
