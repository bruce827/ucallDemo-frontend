import { FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import { List } from 'antd';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountandsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountandsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountandsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.password',
        },
        {},
      ),
      description: (
        <>
          {formatMessage({
            id: 'accountandsettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountandsettings.security.phone-description',
        },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountandsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountandsettings.security.email-description',
        },
        {},
      )}：bruce870827@gmail.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.mfa',
        },
        {},
      ),
      description:'请联系相关运营商获取MFA设备或U盾进行绑定', 
      // formatMessage(
      //   {
      //     id: 'accountandsettings.security.mfa-description',
      //   },
      //   {},
      // ),
      actions: [
        <a key="bind">
          <FormattedMessage id="accountandsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {
    const data = this.getData();
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default SecurityView;
