import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi';

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({
          id: 'accountandsettings.settings.open',
        })}
        unCheckedChildren={formatMessage({
          id: 'accountandsettings.settings.close',
        })}
        defaultChecked
      />
    );
    return [
      // {
      //   title: formatMessage(
      //     {
      //       id: 'accountandsettings.notification.password',
      //     },
      //     {},
      //   ),
      //   description: formatMessage(
      //     {
      //       id: 'accountandsettings.notification.password-description',
      //     },
      //     {},
      //   ),
      //   actions: [Action],
      // },
      // {
      //   title: formatMessage(
      //     {
      //       id: 'accountandsettings.notification.messages',
      //     },
      //     {},
      //   ),
      //   description: formatMessage(
      //     {
      //       id: 'accountandsettings.notification.messages-description',
      //     },
      //     {},
      //   ),
      //   actions: [Action],
      // },
      // {
      //   title: formatMessage(
      //     {
      //       id: 'accountandsettings.notification.todo',
      //     },
      //     {},
      //   ),
      //   description: formatMessage(
      //     {
      //       id: 'accountandsettings.notification.todo-description',
      //     },
      //     {},
      //   ),
      //   actions: [Action],
      // },
      {
        title:"删除消息",
        description:"删除的消息将无法在客户端查看，请谨慎使用此功能。",
        actions: [Action],
      },
      {
        title:"接收S3端消息推送",
        description:"一般为系统默认推送，其中可能包含版本更新内容。",
        actions: [Action],
      },
      {
        title:"接收S4端消息推送",
        description:"一般为商家的系统通知，可能包含一些产品业务相关信息，建议始终打开。",
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
