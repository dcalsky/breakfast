import AV from 'avoscloud-sdk'
import request from 'superagent'
import { Order, Food, OrderDetail } from './init'
// todo[1]: all mistakes should be added

export const createOrder = (total, foods, startDate, endDate, floor, room, name, phone, callback) => {
  let order = new Order()
  let user = AV.User.current()
  order.set('total', total)
  order.set('owner', user)
  order.set('floor', floor)
  order.set('room', room)
  order.set('name', name)
  order.set('phone', phone)
  order.set('startDate', startDate.hours(7).minute(0).second(0).toDate())
  order.set('endDate', endDate.hours(7).minutes(0).second(0).toDate())

  foods.map(element => {
    let detail = new OrderDetail()
    let food = new Food()
    food.id = element.id
    detail.set('food', food)
    detail.set('count', element.count)
    detail.set('order', order)
    detail.save()
  })
  order.save().then(result => {
    if(result.id) {
      user.set('name', name)
      user.save().then(uResult => {
        callback(result)
      })
    }
  })
}


//request
//  .post('http://localhost:3000/pay')
//  .type('form')
//  .send({out_trade_no: result.id, subject: '食物订单', seller_id: '2088221435928705', total_fee: total, body: '普通食物订单', show_url: '1'})
//  .end((err, resp) => {
//    var aliWindow = window.open("", "_self");
//    aliWindow.document.write(resp.text);
//  })