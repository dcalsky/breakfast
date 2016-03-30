import AV from 'avoscloud-sdk'
import _ from 'lodash'
import { Order, Food, OrderDetail, Coupon, CouponDetail } from './init'
// todo[1]: all mistakes should be added

export const createOrder = (total, foods, startDate, floor, room, name, phone, couponId, discount, callback) => {
  let order = new Order()
  let user = AV.User.current()
  order.set('total', total)
  order.set('owner', user)
  order.set('floor', floor)
  order.set('room', room)
  order.set('name', name)
  order.set('phone', phone)
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
        couponDetail.save().then(result => {
          const finalTotal = _.round(total - discount, 1) <= 0 ? 0 : total - discount
          order.set('discount', discount)
          if(finalTotal === 0) {
            order.set('paid', true)
          }
          coupon.set('number', couponNumber - 1)
          coupon.save().then(() => {
            foods.map(element => {
              let detail = new OrderDetail()
              let food = new Food()
              food.id = element.id
              new AV.Query('Food').get(food.id).then(_food => {
                detail.set('name', _food.get('name'))
                detail.set('food', food)
                detail.set('count', element.count)
                detail.set('order', order)
                detail.save()
              });
            })
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
    foods.map(element => {
      let detail = new OrderDetail()
      let food = new Food()
      food.id = element.id
      new AV.Query('Food').get(food.id).then(_food => {
        detail.set('name', _food.get('name'))
        detail.set('food', food)
        detail.set('count', element.count)
        detail.set('order', order)
        detail.save()
      });
    })
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


//request
//  .post('http://localhost:3000/pay')
//  .type('form')
//  .send({out_trade_no: result.id, subject: '食物订单', seller_id: '2088221435928705', total_fee: total, body: '普通食物订单', show_url: '1'})
//  .end((err, resp) => {
//    var aliWindow = window.open("", "_self");
//    aliWindow.document.write(resp.text);
//  })