import AV from 'avoscloud-sdk'
// todo[1]: all mistakes should be added

AV.initialize('puVuQSL2x1iceX0V99MXST4p-gzGzoHsz', 'JezXUL3qvLQB04w5vlKbl6Q3')

export const getFoods = (type) => {
  const query = new AV.Query('Food')
  query.equalTo('type', type).limit(10)
  return query.find()
}

export const getTypes = () => {
  return new AV.Query('Type').find()
}