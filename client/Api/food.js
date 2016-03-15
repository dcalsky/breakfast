import AV from 'avoscloud-sdk'
import { Food } from './init'
// todo[1]: all mistakes should be added

export const getFoods = (type) => {
  const query = new AV.Query('Food')
  query.equalTo('type', type).limit(10)
  return query.find()
}

export const getTypes = () => {
  return new AV.Query('Type').find()
}