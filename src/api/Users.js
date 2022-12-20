import Api from "./Api";

export default {
  getUsers(pageNumber, countNumber) {
    let page = `page=${pageNumber ?? 1}`;
    let count = `count=${countNumber ?? 6}`;

    return Api.get("users?" + page + "&" + count);
  },

  postUser(values, token) {
    var formData = new FormData(); // file from input type='file'
    formData.append("position_id", values.position);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("photo", values.photo);

    return Api.post("users", formData, {
      headers: {
        Token: token
      }
    });
  },

  getUser(idNumber) {
    let id = `id=${idNumber ?? 0}`;

    return Api.get("user?" + id);
  }
};
