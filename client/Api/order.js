import AV from 'avoscloud-sdk'
import { Order, Food } from './init'
// todo[1]: all mistakes should be added

export const createOrder = (total, foods, startDate, endDate, floor, room, name, phone) => {
  let order = new Order()
  let relation = order.relation('foods');
  order.set('total', total)
  order.set('owner', AV.User.current())
  order.set('floor', floor)
  order.set('room', room)
  order.set('name', name)
  order.set('phone', phone)
  order.set('startDate', startDate.hours(7).minute(0).second(0).toDate())
  order.set('endDate', endDate.hours(7).minutes(0).second(0).toDate())

  foods.map(element => {
    let food = new Food()
    food.id = element.id
    relation.add(food)
  })

  order.save()
}