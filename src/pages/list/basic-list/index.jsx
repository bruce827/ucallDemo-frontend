import React, { useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Form,
  // Select,
  InputNumber,
  DatePicker,
  Tag
} from 'antd';
import { findDOMNode } from 'react-dom';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import StandardFormRow from '../search/articles/components/StandardFormRow';
import TagSelect from '../search/articles/components/TagSelect';
import styles from './style.less';


// 任务到期时间logo
import mission_logo_7 from '@/assets/myMission/我的任务7天.svg';
import mission_logo_29 from '@/assets/myMission/我的任务29天.svg';
import mission_logo_90 from '@/assets/myMission/我的任务90天.svg';



import { Select } from 'antd';
const Option = Select.Option;

const A_mission_logo_days = [mission_logo_7, mission_logo_29, mission_logo_90];

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const { RangePicker } = DatePicker;


const FormItem = Form.Item;
const pageSize = 5;

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({ data: { createdAt,phoneCount,description } }) => (

  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>批号</span>
      <p>123312</p>
    </div>
    <div className={styles.listContentItem}>
      <span>分配时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>预约时间</span>
      <p>{moment(createdAt).format('YYYY/MM/DD HH:mm')}</p>
    </div>
    {/* <div className={styles.listContentItem}>
      <span>波次/通次</span>
      <p>{phoneCount}</p>
    </div> */}
    <div className={styles.listContentItem}>
      <span>任务状态</span>
      <p>跟进中</p>
    </div>
    <div className={styles.listContentItem}>
      <span>备注</span>
      <p>{description}</p>
    </div>
  </div>
);

// 标签选项
const labelOptions = [
  { 
    value: 'gold',
    label:'90后'
  }, { 
    value: 'lime',
    label:'小人物'
  }, { 
    value: 'green',
    label:'男'
  }, { 
    value: 'cyan',
    label:'实体店老板'
  }];

function tagRender(props) {
  const { value,label, closable, onClose } = props;

  return (
    <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  );
}
export const BasicList = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    listAndbasicList: { 
      list,
      missionFlags
    },
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  useEffect(() => {
    dispatch({
      type: 'listAndbasicList/fetch',
      payload: {
        count: 5,
      },
    });
  }, [1]);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id) => {
    dispatch({
      type: 'listAndbasicList/submit',
      payload: {
        id,
      },
    });
  };

  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (missionFlags) => {
    // 保存当前搜索框状态
    let A_ExDom = [];
    if(missionFlags&&(missionFlags.includes('预约任务'))){
      A_ExDom.push(['进行中','已过期'])
    }
    if(missionFlags&&(missionFlags.includes('跟进中'))){
      A_ExDom.push(['开场白','持续跟进','竞品比价'])
    }
    if(missionFlags&&(missionFlags.includes('已完成'))){
      A_ExDom.push(['拒绝','其它机会'])
    }
    // if(missionFlags&&(missionFlags.includes('已出单'))){
    //   A_ExDom.push(['犹豫期','其它机会'])
    // }
    return (
      <div className={styles.extraContent}>
          <RadioGroup defaultValue="all">
            <RadioButton value="all">全部</RadioButton>
            {
              A_ExDom.flat(2).map((item=>(<RadioButton value={item}>{item}</RadioButton>)))
            } 
          </RadioGroup>
        {/* <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} /> */}
        {
        missionFlags.includes('预约任务')
          &&(<RangePicker 
              style={{marginLeft:'26px'}} 
              format={'YYYY/MM/DD'} 
              placeholder={['预约开始','预约结束']}
              />)
        }
      </div>
    )
};

  const MoreBtn = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">web呼叫</Menu.Item>
          <Menu.Item key="delete">软电话呼叫</Menu.Item>
        </Menu>
      }
    >
      <a onClick={()=>{
        const _origin = window.location.origin; 
        const _w = window.open(_origin+'/callStudio')
        }}>
        呼叫方式 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current);
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values) => {
    const id = current ? current.id : '';
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'listAndbasicList/submit',
      payload: {
        id,
        ...values,
      },
    });
  };

  const [form] = Form.useForm();

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];
  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };
  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
    },
  };
  return (
    <div>
      <PageHeaderWrapper title={'任务列表'}>
        <Card bordered={false}>
          {/* <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card> */}

          {/* 上方搜索框 */}
          <Form
            layout="inline"
            form={form}
            // initialValues={{
            //   owner: ['wjh', 'zxx'],
            // }}
            onValuesChange={() => {
              dispatch({
                type: 'listAndsearchAndarticles/fetch',
                payload: {
                  count: 8,
                },
              });
            }}
          >
            <StandardFormRow
              title="任务类型"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem name="category">
                <TagSelect 
                  hideCheckAll={true}
                  defaultValue={missionFlags}
                  value={missionFlags}
                  onChange={(missionFlags)=>{
                    dispatch({
                      type: 'listAndbasicList/changeMissionFlag',
                      payload: {
                        missionFlags:missionFlags
                      },
                    });
                  }}
                  >
                  <TagSelect.Option value="新任务">新任务</TagSelect.Option>
                  <TagSelect.Option value="预约任务">预约任务</TagSelect.Option>
                  <TagSelect.Option value="跟进中">跟进中</TagSelect.Option>
                  <TagSelect.Option value="已完成">已完成</TagSelect.Option>
                  <TagSelect.Option value="已出单">已出单</TagSelect.Option>
                  <TagSelect.Option value="其它">其它</TagSelect.Option>
                </TagSelect>
              </FormItem>
            </StandardFormRow>
            {/* <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select mode="multiple" placeholder="选择 owner">
                {owners.map(owner => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow> */}
            <StandardFormRow title="基本信息" grid last>  
              <Row gutter={16}>
                <Col xl={8} lg={10} md={6} sm={24} xs={24}>
                  {/* <InputNumber size="small" min={0} max={100000} defaultValue={0} />
              <InputNumber size="small" min={0} max={100000} defaultValue={0} /> */}
                  <FormItem
                    {...formItemLayout}
                    label="有效期"
                    name="user"
                    style={{ display: 'inline-block' }}
                  >
                    <InputNumber
                      size="small"
                      min={0}
                      max={100000}
                      defaultValue={0}
                      style={{ width: '60px' }}
                    />
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    colon={false}
                    label={'~'}
                    name="user"
                    style={{ display: 'inline-block' }}
                  >
                    <InputNumber
                      size="small"
                      min={0}
                      max={100000}
                      defaultValue={0}
                      style={{ width: '60px' }}
                    />
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={6} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="标签" name="label">
                    <Select
                      placeholder="不限"
                      mode="multiple"
                      tagRender={tagRender}
                      options={labelOptions}
                      style={{
                        minWidth:'240px',
                        // maxWidth: 400,
                        width: '100%',
                      }}
                    >
                      [
                      <Option value="小人物">小人物</Option>
                      <Option value="90后">90后</Option>
                      <Option value="屌丝">屌丝</Option>
                      <Option value="优秀">优秀</Option>
                      ]
                    </Select>
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={6} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="姓名/电话" name="nameOrPhone">
                      <Input placeholder="姓名或尾号"/>
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.standardList}>
          {/* 列表 */}
          <Card
            className={styles.listCard}
            bordered={false}
            title="任务列表"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent(missionFlags)}
          >
            {/* <Button
              type="dashed"
              style={{
                width: '100%',
                marginBottom: 8,
              }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              添加
            </Button> */}

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      工单申请
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        src={A_mission_logo_days[Math.floor(Math.random() * A_mission_logo_days.length)]} 
                        shape="square" 
                        size="large" 
                      />}
                    title={<a href={item.href}>{item.userName+`(${item.phoneNum})`}</a>}
                    description={item.tags}
                    style={{minWidth:'160px'}}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default connect(({ listAndbasicList, loading }) => ({
  listAndbasicList,
  loading: loading.models.listAndbasicList,
}))(BasicList);
