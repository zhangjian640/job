const express = require('express')
const Router = express.Router()
const utils = require('utility')

const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid
  User.find({}, function (e, userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })

    Chat.find({'$or':[{from: user}, {to: user}]}, function (err, doc) {
      if (!err) {
        return res.json({code: 0, msgs: doc, users: users})
      }
    })

  })
})

Router.get('/list', (req, res) => {
  const {type} = req.query

  User.find({type}, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})

Router.get('/info', (req, res) => {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save((e, d) => {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({
        code: 0,
        data: {user, type, _id}
      })
    })
  })
})

Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: {doc}})
  })
})

Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

Router.post('/readmsg', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1})
  }
  const {from} = req.body
  Chat.update({from, to:userid}, {'$set': {read: true}}, {'multi': true},(err, doc)=>{
    if (!err) {
      return res.json({code:0, num: doc.nModified})
    }
    return res.json({code:0, msg:'修改失败'})
  })

})

/**
 * md5加密
 * @param {*} pwd 密码
 */
function md5Pwd (pwd) {
  const salt = 'you do not know'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router