import { FormattedMessage, formatMessage } from 'umi';
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List,Avatar } from 'antd';
import React, { Component, Fragment } from 'react';

import { UserOutlined } from '@ant-design/icons';
import pf from '@/assets/bank/pf.png'
import zs from '@/assets/bank/zs.jpg'

class BindingView extends Component {
  // state ={
  // }
  // 绑定操作
  handleBindCard = (item)=>{
    console.log(item);
    debugger
  }
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'accountandsettings.binding.taobao',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.binding.taobao-description',
        },
        {},
      ),
      actions: [
        <a key="Bind" onClick={this.handleBindCard}>
          {/* <FormattedMessage id="accountandsettings.binding.bind" defaultMessage="Bind" /> */}
          已绑定
        </a>,
      ],
      avatar: <Avatar shape="square" size={54} icon={<UserOutlined />} src={pf}/>,

    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.binding.alipay',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.binding.alipay-description',
        },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage id="accountandsettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.binding.dingding',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.binding.dingding-description',
        },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage id="accountandsettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar:<Avatar shape="square" size={54} icon={<UserOutlined />} src={zs}/>,
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default BindingView;
