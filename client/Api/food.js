import AV from 'avoscloud-sdk'
// todo[1]: all mistakes should be added

export const getFoods = (type) => {
  const query = new AV.Query('Food')
  query.addDescending('name')
  //query.equalTo('type', type).limit(10)
  return query.find()
}

export const getTypes = () => {
  return new AV.Query('Type').find()
}