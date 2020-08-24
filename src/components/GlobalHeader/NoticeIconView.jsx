import React, { Component, Fragment } from 'react';
import { connect } from 'umi';
import { Tag, message,Modal } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

class GlobalHeaderRight extends Component {
  state={
    msgCenterConfirm:false,
    ...this.props
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      notices: nextProps.notices,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  }

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  handleNoticeClear = (title, key) => {
    
    const { dispatch } = this.props;
    message.success(`消息已清空`);
    debugger
    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };

  getNoticeData = () => {
    // const { notices = [] } = this.props;
    const { notices = [] } = this.state;


    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
      return {};
    }

    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };

      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag
            color={color}
            style={{
              marginRight: 0,
            }}
          >
            {newNotice.extra}
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.keys(noticeData).forEach(key => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });


    return unreadMsg;
  };
  // 获取未读消息
  getUnread = list=>{
    let _list = list || []
    return _list.filter(v=>v.isReading == 1) || []
  }
  handleOk = async e => {
    // this.handleNoticeClear()
    await this.setState({
      notices:[]
    })
    await this.setState({
      msgCenterConfirm: false,
    });
  };

  handleCancel = e => {
    this.setState({
      msgCenterConfirm: false,
    });
  };
  // 置为已读
  handleClick = item=>{
    let _list = this.state.notices;
          for(let i=0;i<_list.length;i++){
            if(_list[i].id == item.id){
              _list[i].read = true
            }
          }
          this.setState({
            notices:_list
          })
  }
  // 全部置为已读
  allClean = ()=>{
    let _list = this.state.notices;
    _list.forEach(v=>{
      v.read = true
    })
    this.setState({
      notices:_list
    })
  }
  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    // 未读消息
    const unreadData = this.getUnread(noticeData.msg)
    return (
      <Fragment>
      <NoticeIcon
        className={styles.action}
        // count={currentUser && (+(unreadData.length)>99?'99+':unreadData.length)}
        count={noticeData.msg?(+(unreadData.length)>99?'99+':unreadData.length):currentUser.unreadCount}
        onItemClick={item=>this.handleClick(item)}
        loading={fetchingNotices}
        clearText="清空"
        viewMoreText="全部已读"
        // onClear={this.handleNoticeClear}
        onClear={()=>{
          this.setState({
            msgCenterConfirm:true
          })
        }}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={()=>this.allClean()}
        clearClose
      >
        {/* 未读 */}
        <NoticeIcon.Tab
          tabKey="event"
          title="未读"
          emptyText="没有未读的通知"
          // count={unreadMsg.event}
          count={7-unreadData.length}
          list={noticeData.msg?noticeData.msg.filter(v=>v.isReading != 1):[]}
          showViewMore
        />
        {/* 已读 */}
        <NoticeIcon.Tab
          tabKey="message"
          // count={unreadMsg.message}
          count={unreadData.length}
          list={unreadData}
          title="已读"
          emptyText="没有已读的通知"
          showViewMore
        />
        {/* 全部 */}
        <NoticeIcon.Tab
          tabKey="notification"
          // count={unreadMsg.notification}
          count={7}
          // list={noticeData.notification}
          list={noticeData.msg}
          title="全部"
          emptyText="你已查看所有通知"
          showViewMore
        />

      </NoticeIcon>

       {/*  清空消息弹窗 */}
        
        <Modal
          title="消息中心提示"
          visible={this.state.msgCenterConfirm}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText={"再看看"}
          okText={"仍要清空"}
        >
        {this.state.notices.every(v=>v.read == true)
          ?(<p>清除后消息不可恢复，您确定要删除吗？</p>)
          :(<p>此操作会删除您对应类别的消息，建议您先阅读“未读”的消息后再执行此操作。</p>)
        }
      </Modal>
    </Fragment>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
