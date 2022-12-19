import Api from "./Api";

export default {
  getPositions() {
    return Api.get('positions');
  }
}