import AV from 'avoscloud-sdk'
import { TimeSlot } from './init'
// todo[1]: all mistakes should be added

export const getTimeSlot = () => {
  const query = new AV.Query('TimeSlot')
  return query.find()
}