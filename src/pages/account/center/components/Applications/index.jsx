import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  RightOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, List, Menu, Tooltip,Button, Tag, Space,Modal,Divider,Upload,Alert,Input } from 'antd';
import React,{useState} from 'react';
import { connect } from 'umi';
import numeral from 'numeral';
import stylesApplications from './index.less';

import ProList from '@ant-design/pro-list';
import ProCard from '@ant-design/pro-card'


const dataSource = ['提现工单', '客服工单', '其它工单'];

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'error',
  },
];
// 对话签名
const LetterSing = ()=> (<p>以上祝好，<br/>徐健<br/>优飞科技运维团队</p>)
export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let result = val;

  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }

  return result;
}

const Applications = props => {
  const { list,missionModalVisible } = props;
  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  const CardInfo = ({ activeUser, newUser }) => (
    <div className={stylesApplications.cardInfo}>
      <div>
        <p>活跃用户</p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>新增用户</p>
        <p>{newUser}</p>
      </div>
    </div>
  );

  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
    <ProList
      actions={[
        <Button key="3" type="primary">
          新建工单
        </Button>,
      ]}
      rowKey="id"
      title="工单列表"
      showActions="hover"
      dataSource={dataSource}
      renderItem={(item,index) => ({
        title: item,
        subTitle: (
          <Space size={0}>
          {index == 0 ? <Tag color="blue">进行中</Tag> : <Tag color="#5BD8A6">已完成</Tag>}
          </Space>
        ),
        actions: [<a onClick={(v,i)=>{
          const {dispatch} = props;
          dispatch({
            type:'accountAndcenter/setModalVisible',
            payload:{
              missionModalVisible:true
            }
          })
        }}>查看详情</a>],
        description:
          '我前两天还能用呢，自从你们迁移了新的地址以后我在这里就没有看到我的订单信息，你们查一下是不是忘记添加了。附件为我的续费订单邮件。',
      })}
    />
    <Modal
      title="详情"
      // style={{ top: 20 }}
      visible={missionModalVisible}
      // footer={null}
      // onOk={() =>{
      //   const {dispatch} = props;
      //   dispatch({
      //     type:'accountAndcenter/setModalVisible',
      //     payload:false
      //   })
      // }}
      okText="提交"
      onCancel={() => {
        const {dispatch} = props;
        dispatch({
          type:'accountAndcenter/setModalVisible',
          payload:{
            missionModalVisible:false
          }
        })
      }}
    >
      <Alert
      message="此工单已关闭，填写回复并提交可以从新打开工单"
      type="warning"
      closable
      />
      <ProCard
        title={(<a onClick={() => {
          setCollapsed(!collapsed);
        }}>回复</a>)}
        extra={
          <span>
          <RightOutlined
            rotate={!collapsed ? 90 : undefined}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          </span>
        }
        style={{ marginTop: 16 }}
        headerBordered
        collapsed={collapsed}
      >
        <Input.TextArea
        rows={3}
        style={{marginBottom:12}}
        />
        <Upload  
            listType={'picture'}
            defaultFileList={[]}
        >
        <Button>
          <UploadOutlined /> 上传图片
        </Button>
        </Upload>
      </ProCard>
      <ProCard 
        title={(
          <>
            <UserOutlined />
            <span style={{paddingLeft: 8}}>Bruce xu {"(客服)"}</span>
            {/* <span style={{fontSize:14,color:"rgba(255,255,255,.3)"}}>(客服)</span> */}
          </>
        )} 
        extra="2019年9月28日(05:25)" 
        headerBordered>
          <p>
            你好，你提供的订单并非来自本网站，请访问购买网站获取技术支援。
          </p>
          <LetterSing/>
          {/* <Upload  
            action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
            listType={'picture'}
            defaultFileList={[...fileList]}
          >
          </Upload> */}
      </ProCard>
      <ProCard 
        title={(
          <>
            <UserOutlined />
            <span style={{paddingLeft: 8}}>刘青{"(坐席)"}</span>
          </>
        )} 
        extra="2019年9月28日(05:25)" 
        headerBordered>
          <p>
            我前两天还能用呢，自从你们迁移了新的地址后我在这里就没有看到我的订单信息，你们查一下是不是忘记添加了。附件为我的续费订单邮件。
          </p>
          <Upload  
            action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
            listType={'picture'}
            defaultFileList={[...fileList]}
          >
          </Upload>
      </ProCard>
      <ProCard 
        title={(
          <>
            <UserOutlined />
            <span style={{paddingLeft: 8}}>Bruce xu {"(客服)"}</span>
          </>
        )} 
        extra="2019年9月28日(05:25)" 
        headerBordered>
          <p>
            您当前在本站没有有效产品<br/>
            如您确认拥有产品请提供payPal或相关账单支付截图或信用卡交易截图用于查询账户信息。<br/>
            如果您有任何有关我们产品或客户服务的问题，欢迎您以电子邮件或工单联系我，我会尽力系协助
          </p>
          <LetterSing/>
      </ProCard>
      <ProCard 
        title={(
          <>
            <UserOutlined />
            <span style={{paddingLeft: 8}}>Bruce xu{"(坐席)"}</span>
          </>
        )} 
        extra="2019年9月28日(05:25)" 
        headerBordered>
          <p>
            你好，我想知道我的账号是什么时候到期的，我在账单上查不出来。
          </p>
      </ProCard>
    </Modal>
  </>
    // <List
    //   rowKey="id"
    //   className={stylesApplications.filterCardList}
    //   grid={{
    //     gutter: 16,
    //     xs: 1,
    //     sm: 2,
    //     md: 3,
    //     lg: 3,
    //     xl: 4,
    //     xxl: 4,
    //   }}
    //   dataSource={list}
    //   renderItem={item => (
    //     <List.Item key={item.id}>
    //       <Card
    //         hoverable
    //         bodyStyle={{
    //           paddingBottom: 20,
    //         }}
    //         actions={[
    //           <Tooltip key="download" title="下载">
    //             <DownloadOutlined />
    //           </Tooltip>,
    //           <Tooltip title="编辑" key="edit">
    //             <EditOutlined />
    //           </Tooltip>,
    //           <Tooltip title="分享" key="share">
    //             <ShareAltOutlined />
    //           </Tooltip>,
    //           <Dropdown overlay={itemMenu} key="ellipsis">
    //             <EllipsisOutlined />
    //           </Dropdown>,
    //         ]}
    //       >
    //         <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
    //         <div className={stylesApplications.cardItemContent}>
    //           <CardInfo
    //             activeUser={formatWan(item.activeUser)}
    //             newUser={numeral(item.newUser).format('0,0')}
    //           />
    //         </div>
    //       </Card>
    //     </List.Item>
    //   )}
    // />
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
  missionModalVisible:accountAndcenter.missionModalVisible
}))(Applications);
