import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message,Radio } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

import myAvatar from '@/assets/myAvatar2.png'
const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="accountandsettings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage
            id="accountandsettings.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload>
  </>
);

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value;

  if (!province.key) {
    callback('Please input your province!');
  }

  if (!city.key) {
    callback('Please input your city!');
  }

  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

class BaseView extends Component {
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = ''
      // = 'https://bruce827.github.io/portfolio/assets/img/intro/photo.jpg'
      // = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';

      return url;
    }

    return '';
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleFinish = () => {
    message.success(
      formatMessage({
        id: 'accountandsettings.basic.update.success',
      }),
    );
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            {/* 昵称 */}
            <Form.Item
              name="name"
              label={formatMessage({
                id: 'accountandsettings.basic.nickname',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.nickname-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* 真实姓名 */}
            <Form.Item
              name="realName"
              label={"真实姓名"}
            >
              <Input disabled/>
            </Form.Item>
             {/* 性别 */}
            <Form.Item
              name="sex"
              label={"性别"}
            >
              <Radio.Group >
                <Radio value={"1"}>{"男"}</Radio>
                <Radio value={"2"}>{"女"}</Radio>
                <Radio value={"0"}>{"保密"}</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 电话 */}
            <Form.Item
              name="phone"
              label={"电话"}
            >
              <Input disabled/>
            </Form.Item>
            {/* 部门 */}
            <Form.Item
              name="group"
              label={"部门"}
            >
              <Input disabled/>
            </Form.Item>
            {/* 邮箱 */}
            <Form.Item
              name="email"
              label={formatMessage({
                id: 'accountandsettings.basic.email',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.email-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* 个人简介 */}
            <Form.Item
              name="profile"
              label={formatMessage({
                id: 'accountandsettings.basic.profile',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.profile-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input.TextArea
                placeholder={formatMessage({
                  id: 'accountandsettings.basic.profile-placeholder',
                })}
                rows={4}
              />
            </Form.Item>
            {/* 所在地 */}
            <Form.Item
              name="geographic"
              label={formatMessage({
                id: 'accountandsettings.basic.geographic',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.geographic-message',
                    },
                    {},
                  ),
                },
                {
                  validator: validatorGeographic,
                },
              ]}
            >
              <GeographicView />
            </Form.Item>
            {/* 更新 */}
            <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="accountandsettings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView 
            // avatar={this.getAvatarURL()} 
            avatar={myAvatar} 
            />
        </div>
      </div>
    );
  }
}

export default connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))(BaseView);
