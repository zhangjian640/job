import React from "react";
import {connect} from "react-redux";
import {NavBar} from "antd-mobile";
import NavLinkBar from "../navlink/navlink";
import {Route, Switch} from "react-router-dom";
import Boss from "../../component/boss/boss";
import Genius from "../../component/genius/genius";
import User from "../../component/user/user";
import Msg from "../../component/message/message";

import {getMsgList, recvMsg} from "../../redux/chat.redux";

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component {

  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render () {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        hide: user.type === 'genius',
        component: Boss
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss列表',
        hide: user.type === 'boss',
        component: Genius
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{marginTop: 55}}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard