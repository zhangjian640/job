import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { register } from '../../redux/user.redux'
import Form from '../../component/form/form'

@connect(
  state=>state.user,
  {register}
)
@Form
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  login() {
    this.props.history.push('/login')
  }

  handleRegister() {
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
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
          <InputItem
            onChange={v=>this.props.handleChange('repeatpwd', v)}
            type='password'
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.props.state.type === 'genius'}
          onChange={()=>{this.props.handleChange('type', 'genius')}}
          >
            牛人
          </RadioItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.props.state.type === 'boss'}
            onChange={()=>{this.props.handleChange('type', 'boss')}}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button onClick={this.handleRegister.bind(this)} type='primary'>注册</Button>
        </List>
      </div>
    )

  }
}

export default Register