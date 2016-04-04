import AV from 'avoscloud-sdk'
import _ from 'lodash'
import { Order, Food, OrderDetail, Coupon, CouponDetail, Ingredient } from './init'
// todo[1]: all mistakes should be added


const saveFoods = (foods, order) => {
  foods.map(element => {
    let detail = new OrderDetail()
    let food = new Food()
    let ingredient_relation = detail.relation('ingredients')
    food.id = element.id
    new AV.Query('Food').get(food.id).then(_food => {
      const sold = _food.get('sold')
      food.set('sold', parseInt(sold) + element.count)
      detail.set('name', _food.get('name'))
      detail.set('food', food)
      detail.set('count', element.count)
      detail.set('order', order)
      element.ingredients.map(ingredient => {
        let _ingredient = new Ingredient()
        _ingredient.id = ingredient.id
        ingredient_relation.add(_ingredient)
      })
      detail.save().then(() => {
        console.log('detail completed')
      })
    });
  })
}

export const getOrderDetail = orderId => {
  let order = new Order()
  let query_detail = new AV.Query('OrderDetail')
  order.id = orderId
  query_detail.equalTo('order', order)
  return query_detail.find()
}

export const createOrder = (total, foods, startDate, floor, room, name, phone, note, couponId, discount, callback) => {
  let order = new Order()
  let user = AV.User.current()
  order.set('total', total)
  order.set('owner', user)
  order.set('floor', floor)
  order.set('room', room)
  order.set('name', name)
  order.set('phone', phone)
  order.set('note', note)
  order.set('startDate', startDate.second(0).toDate())
  if(couponId) {
    let coupon = new Coupon()
    let query = new AV.Query('Coupon')
    query.equalTo('objectId', couponId)
    query.find().then(_coupon => {
      const couponNumber = _coupon[0].get('number')
      if(couponNumber > 0) {
        let couponDetail = new CouponDetail()
        let relation = user.relation('coupon')
        coupon.id = couponId
        relation.remove(coupon)
        couponDetail.set('coupon', coupon)
        couponDetail.set('user', user)
        couponDetail.save().then(() => {
          const finalTotal = _.round(total - discount, 1) <= 0 ? 0 : total - discount
          order.set('discount', discount)
          if(finalTotal === 0) {
            order.set('paid', true)
          }
          coupon.set('number', couponNumber - 1)
          coupon.save().then(() => {
            saveFoods(foods, order)
            order.save().then(result => {
              if(result.id) {
                user.set('name', name)
                user.save().then(() => {
                  callback({id: result.id, total: finalTotal})
                })
              }
            })
          })
        })
      } else {
        // todo coupon number is empty
      }
    })
  } else {
    saveFoods(foods, order)
    order.save().then(result => {
      if(result.id) {
        user.set('name', name)
        user.save().then(() => {
          callback({id: result.id, total: result.get('total')})
        })
      }
    })
  }
}
