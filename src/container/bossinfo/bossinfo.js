import React from 'react'
import { NavBar, TextareaItem, InputItem, WhiteSpace, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

@connect(
  state => state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      'title': '',
      'company':'',
      'money': '',
      'desc':'',
      'avatar': ''
    }
  }
  selectAvatar(imagename){
    this.setState({
      avatar: imagename
    })
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleSave () {
    this.props.update(this.state)
  }
  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar.bind(this)}></AvatarSelector>
        <WhiteSpace></WhiteSpace>
        <InputItem onChange={(v)=>this.onChange('title', v)}>招聘职位</InputItem>
        <WhiteSpace></WhiteSpace>
        <InputItem onChange={(v)=>this.onChange('company', v)}>公司名称</InputItem>
        <WhiteSpace></WhiteSpace>
        <InputItem onChange={(v)=>this.onChange('money', v)}>职位薪资</InputItem>
        <WhiteSpace></WhiteSpace>
        <TextareaItem 
          rows='3' 
          autoHeight='true' 
          title='职位要求' 
          onChange={(v)=>this.onChange('desc', v)}
        ></TextareaItem>
        <WhiteSpace></WhiteSpace>
        <Button onClick={this.handleSave.bind(this)} type='primary'>保存</Button>
      </div>
    )
  }
}

export default BossInfo