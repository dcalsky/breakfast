import AV from 'avoscloud-sdk'
import { Floor } from './init'
// todo[1]: all mistakes should be added

export const getFloors = () => {
  const query = new AV.Query('Floor')
  return query.find()
}