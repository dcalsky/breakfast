import AV from 'avoscloud-sdk'
import { Food } from './init'
// todo[1]: all mistakes should be added

export const getFoods = (type) => {
  let query = new AV.Query('Food')
  query.addDescending('name')
  return query.find()
}

export const getTypes = () => {
  return new AV.Query('Type').find()
}

export const getIngredient = foodId => {
  let query = new AV.Query('Ingredient')
  let food = new Food()
  food.id = foodId
  query.addDescending('price')
  query.equalTo('food', food)
  return query.find()
}