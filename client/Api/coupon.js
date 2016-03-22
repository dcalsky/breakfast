import AV from 'avoscloud-sdk'
import _ from 'lodash'
import { Coupon, CouponDetail } from './init'
// todo[1]: all mistakes should be added

export const hadCoupon = (couponId, user, callback) => {
  let query = new AV.Query('CouponDetail')
  let relation = user.relation('coupon')
  let coupon = new Coupon()
  let couponDetail = new CouponDetail()
  if(couponId) {
    coupon.id = couponId
    relation.query().find().then(function(list) {
      if(_.find(list, {id: couponId})) {
        callback(true) // has it
      } else {
        query.equalTo('coupon', coupon)
        query.equalTo('user', user)
        query.find().then((result) => {
          if(result.length !== 0) {
            callback(true) // be used
          } else {
            callback(false)
          }
        })
      }
    })
  } else {
    callback(true)
  }

}

export const addCoupon = (couponId, user) => {
  let coupon = new Coupon()
  let relation = user.relation('coupon')
  coupon.id = couponId
  relation.add(coupon)
  return user.save()
}

export const fetchCoupon = (user, callback) => {
  let relation = user.relation('coupon')
  relation.query().find().then(function(list) {
    callback(list)
  })
}