import AV from 'avoscloud-sdk'
import { Order, Food } from './init'
// todo[1]: all mistakes should be added

export const createOrder = (total, foods, startDate, duration) => {
  let order = new Order()
  let relation = order.relation('foods');
  order.set('total', total)
  order.set('owner', AV.User.current())
  foods.map(element => {
    let food = new Food()
    food.id = element.id
    relation.add(food)
  })
  order.save()
}