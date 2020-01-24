import axios from "axios";

const API_URL = `${window.location.protocol}//api--${window.location.hostname}`;

export default class ActionsApiService {
  constructor() {}

  getActions() {
    const url = `${API_URL}/api/v1/actions/`;
    return axios.get(url, { crossdomain: true }).then(response => response.data);
  }
  getAction(id) {
    const url = `${API_URL}/api/v1/actions/${id}/`;
    return axios.get(url, { crossdomain: true }).then(response => response.data);
  }
  deleteAction(id) {
    const url = `${API_URL}/api/v1/actions/${id}/`;
    return axios.delete(url, { crossdomain: true });
  }
  createAction(action) {
    const url = `${API_URL}/api/v1/actions/`;
    return axios.post(url, action);
  }
  updateAction(action) {
    const url = `${API_URL}/api/v1/actions/${action.id}/`;
    return axios.put(url, action);
  }
}
