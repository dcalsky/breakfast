import AV from 'avoscloud-sdk'
import { Order } from './init'
// todo[1]: all mistakes should be added
// todo[2]: all action trigger before checking hadLogin property


export const login = (username, password) => {
    return AV.User.logIn(username, password)
}

export const loginWithPhone = (phone, key, couponId) => {
  let user = new AV.User()
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


export const getUserInfo = (user) => {
  let query_order = new AV.Query('Order')
  query_order.equalTo('owner', user)
  query_order.addDescending('createdAt')
  query_order.limit(8)
  return query_order.find()
}

export const logout = () => {
  // logout
}
