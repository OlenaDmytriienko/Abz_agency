import Api from "./Api";

export default {
  getToken() {
    return Api.get('token');
  }
}