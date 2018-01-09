const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/job'
mongoose.connect(uri, {useMongoClient: true})

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB ', uri)
})

const models = {
  user: {
    user: {type: String, required: true},
    pwd: {type: String, required: true},
    type: {type: String, required: true},
    avatar: {type: String},
    // 个人简历或职位介绍
    desc: {type: String},
    // 职位名
    title: {type: String},
    company: {type: String},
    money: {type: String},
  },
  chat: {
    'chatid': {type: String, required: true},
    'from': {type: String, required: true},
    'to': {type: String, required: true},
    'read': {type: Boolean, default: false},
    'content': {type: String, required: true, default:''},
    'create_time': {type: Number, default:new Date().getTime()}
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}
