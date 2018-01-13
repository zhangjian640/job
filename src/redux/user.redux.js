import axios from "axios";
import {getRedirectPath} from "../util";

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERR_MSG = 'ERR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo:'',
  user: '',
  type: '',
  msg: '',
}

export function user (state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload.doc), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERR_MSG:
      return {...state, msg: action.msg, isAuth: false}
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state
  }
}

function authSuccess (obj) {
  const {pwd, ...data} = obj
  return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg (msg) {
  return {msg, type: ERR_MSG}
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return async dispatch => {
    const res = await axios.post('/user/login', {user, pwd})
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}

export function loadData (userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不一致')
  }
  return async dispatch => {
    const res = await axios.post('/user/register', {user, pwd, type})
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess({user, pwd, type}))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}

export function update (data) {
  return async dispatch => {
    const res = await axios.post('/user/update', data)
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}

export function logoutSubmit () {
  return {type: LOGOUT}
}