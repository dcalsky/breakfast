import AV from 'avoscloud-sdk'
// todo[1]: all mistakes should be added
// todo[2]: all action trigger before checking hadLogin property

export const login = (username, password) => {
    return AV.User.logIn(username, password)
}

export const loginWithPhone = (phone, key) => {

}

export const getKey = phone => {
   AV.Cloud.requestSmsCode(phone).then(function() {
     console.log('success')
   }, function(err) {

   });
}

export const register = (username, password) => {
  // register
}

//export const updateInfo = (username, newInfo) => {
//
//}

export const logout = () => {
  // logout
}

export const getOrder = username => {
  // AV.User.getCurrentUser
  // getOrder
}