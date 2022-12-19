import Api from "./Api";

export default {
  getUsers(pageNumber, countNumber) {
    let page = `page=${pageNumber ?? 1}` 
    let count = `count=${countNumber ?? 6}` 

    return Api.get('users?' + page + '&' + count);
  },

  postUser(nameString, emailString, phoneString, positionIdNumber, photoData) {
    let name = `name=${nameString}` 
    let email = `email=${emailString}` 
    let phone = `phone=${phoneString}` 
    let position = `position_id=${positionIdNumber}` 
    let photo = `photo=https://prohvost.club/wp-content/uploads/2018/05/britanskaya-shinshilla-700x329.jpg`
console.log('users?' + name + '&' + email + '&' + phone + '&' + position + '&' + photo);
    return Api.post('users?' + name + '&' + email + '&' + phone + '&' + position + '&' + photo)
  },

  getUser(idNumber) {
    let id = `id=${idNumber ?? 0}` 

    return Api.get('user?' + id);
  }
}