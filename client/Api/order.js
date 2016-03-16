import AV from 'avoscloud-sdk'
import { Order, Food, OrderDetail } from './init'
// todo[1]: all mistakes should be added

export const createOrder = (total, foods, startDate, endDate, floor, room, name, phone) => {
  let order = new Order()
  let user = AV.User.current()
  order.set('total', total)
  order.set('owner', AV.User.current())
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
  return order.save().then(result => {
    if(result.id) {
      user.set('name', name)
      user.save()
    }
  })
}