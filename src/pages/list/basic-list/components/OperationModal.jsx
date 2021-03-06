import React, { useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import styles from '../style.less';

const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const OperationModal = props => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const modalFooter = done
    ? {
        footer: null,
        onCancel: onDone,
      }
    : {
        okText: '保存',
        onOk: handleSubmit,
        onCancel,
      };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {/* 工单类型 */}
        <Form.Item
          name="type"
          label="工单类型"
          initialValue="提现工单"
          rules={[
            {
              required: true,
              message: '请选择工单类型',
            },
          ]}
        >
          <Select disabled placeholder="请选择">
            <Select.Option value="提现工单">提现工单</Select.Option>
            <Select.Option value="客服工单">客服工单</Select.Option>
          </Select>
        </Form.Item>
        {/* 我的资产 */}
        <Form.Item
          name="myCash"
          label="当前资产"
          initialValue={2334.00}
        >
          <Input disabled prefix="￥" suffix="RMB" />
        </Form.Item>
         {/* 提现金额 */}
        <Form.Item
          name="cash"
          label="提现金额"
          rules={[
            {
              required: true,
              message: '提现金额不能为空',
            },
          ]}
        >
          <Input prefix="￥" suffix="RMB" />
        </Form.Item>
        <Form.Item
          name="subDescription"
          label="工单备注"
          rules={[
            {
              message: '请输入至少五个字符的备注！',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      // title={done ? null : `任务${current ? '编辑' : '添加'}`}
      title={"提现工单"} 
      className={styles.standardListForm}
      width={640}
      bodyStyle={
        done
          ? {
              padding: '72px 0',
            }
          : {
              padding: '28px 0 0',
            }
      }
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
