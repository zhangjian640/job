import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { login } from '../../redux/user.redux'
import Form from '../../component/form/form'

@connect(
  state => state.user,
  { login }
)
@Form
class Login extends React.Component{
  constructor(props) {
    super(props)

    this.register = this.register.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }

  handleLogin () {
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        {(this.props.redirectTo&&this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p>: null}
          <InputItem
            onChange={v=>this.props.handleChange('user', v)}
          >用户</InputItem>
          <WhiteSpace />
          <InputItem
            onChange={v=>this.props.handleChange('pwd', v)}
            type='password'
          >密码</InputItem>
          <WhiteSpace />
        </List>
        <WingBlank>
          <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login