import AV from 'avoscloud-sdk'
// todo[1]: all mistakes should be added
// todo[2]: all action trigger before checking hadLogin property

export const login = (username, password) => {
    return AV.User.logIn(username, password)
}

export const loginWithPhone = (phone, key, password) => {
  var user = new AV.User();
  return user.signUpOrlogInWithMobilePhone({
    mobilePhoneNumber: phone,
    smsCode: key
  })
}

export const getKey = phone => {
   AV.Cloud.requestSmsCode(phone)
}

export const getCurrentUser = () => {
  return AV.User.current()
}

export const register = (username, password) => {
  return AV.User.signUp(username, password)
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