import AV from 'avoscloud-sdk'
AV.initialize('puVuQSL2x1iceX0V99MXST4p-gzGzoHsz', 'JezXUL3qvLQB04w5vlKbl6Q3');

// todo[1]: all mistakes should be added

const find = (query, callback) => {
  query.find().then(result => {
    callback(result)
  }, err => {
    // todo[1]
  })
}

export const getFoods = (type, callback) => {
  const query = new AV.Query('Food')
  query.equalTo('type', type).limit(10)
  find(query, callback)

}

export const getTypes = callback => {
  const query = new AV.Query('Type')
  find(query, callback)
}