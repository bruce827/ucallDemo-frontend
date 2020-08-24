import { Card, List, Button, Progress, Tag, Space,Modal,Result } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import ProList from '@ant-design/pro-list';
import ProDescriptions from '@ant-design/pro-descriptions'
import AvatarList from '../AvatarList';
import styles from './index.less';

import { TransactionOutlined } from '@ant-design/icons';

const dataSource = ['201.11', '23.21', '12.00', '192.00'];
const Projects = (props) => {
  const { list,cashModalVisible } = props;
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  // return (
  //   <List
  //     className={styles.coverCardList}
  //     rowKey="id"
  //     grid={{
  //       gutter: 16,
  //       xs: 1,
  //       sm: 2,
  //       md: 3,
  //       lg: 3,
  //       xl: 4,
  //       xxl: 4,
  //     }}
  //     dataSource={list}
  //     renderItem={item => (
  //       <List.Item>
  //         <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
  //           <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} />
  //           <div className={styles.cardItemContent}>
  //             <span>{moment(item.updatedAt).fromNow()}</span>
  //             <div className={styles.avatarList}>
  //               <AvatarList size="small">
  //                 {item.members.map(member => (
  //                   <AvatarList.Item
  //                     key={`${item.id}-avatar-${member.id}`}
  //                     src={member.avatar}
  //                     tips={member.name}
  //                   />
  //                 ))}
  //               </AvatarList>
  //             </div>
  //           </div>
  //         </Card>
  //       </List.Item>
  //     )}
  //   />
  // );
  return (
    <>
      <ProList
        actions={[
          <Button key="3" type="primary">
            申请提现
          </Button>
        ]}
        rowKey="id"
        title="提现流水"
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        dataSource={dataSource}
        renderItem={(item, index) => ({
          title: (
            <span>{(index == 0?'¥':'-¥') + item}</span>
          ),
          subTitle: (
            <Space size={0}>
              {index == 0 ? <Tag color="blue">入账</Tag> : <Tag color="#5BD8A6">提现</Tag>}
            </Space>
          ),
          actions: [<a onClick={()=>{
            const {dispatch} = props;
            dispatch({
              type:'accountAndcenter/setModalVisible',
              payload:{cashModalVisible:true}
            })
          }}>详情</a>],
          description:'工商银行(1293)',
          children: (
            <div
              style={{
                minWidth: 200,
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {/* 账户余额 */}
              <div
                style={{width:'100px'}}
              >
                <div>账户余额</div>
                <p>¥23.22</p>
              </div>
              {/* 交易时间 */}
              <div
                style={{width:'200px'}}
              >
                <div>交易时间</div>
                <p>2020/12/23 12:12:11</p>
              </div>
              {/* 转账备注 */}
              <div
                style={{
                  width: '200px',
                }}
              >
                <div>备注</div>
                {/* <Progress percent={80} /> */}
                <div>这是一个备注，可以折行</div>
              </div>
            </div>
          ),
        })}
      />
      {/* 详情弹窗 */}
      <Modal
          title="详情"
          // style={{ top: 20 }}
          visible={cashModalVisible}
          centered = {true}
          footer={null}
          width={320}
          // onOk={() =>{
          //   const {dispatch} = props;
          //   dispatch({
          //     type:'accountAndcenter/setModalVisible',
          //     payload:false
          //   })
          // }}
          onCancel={() => {
            const {dispatch} = props;
            dispatch({
              type:'accountAndcenter/setModalVisible',
              payload:{
                cashModalVisible:false
              }
            })
          }}
        >
          <Result
            icon={<TransactionOutlined />}
            title="资金入账"
            // extra={<Button type="primary">Next</Button>}
          />
          <ProDescriptions 
            column={1} 
            title="交易明细" 
            tip="数据来源于银行对账数据"
            closed={true}
            >
            <ProDescriptions.Item label="批号">22993c233X</ProDescriptions.Item>
            <ProDescriptions.Item label="时间" valueType="dateTime">
              {moment().valueOf()}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="卡号">2022*********2321</ProDescriptions.Item>
            <ProDescriptions.Item label="金额"  valueType="money">
              100
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="交易类型"
              valueEnum={{
                all: { text: '全部', status: 'Default' },
                open: {
                  text: '未解决',
                  status: 'Error',
                },
                closed: {
                  text: '成单返现',
                  status: 'Success',
                },
                processing: {
                  text: '解决中',
                  status: 'Processing',
                },
              }}
            >
              closed
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="交易类型"
              request={async () => [
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '银行卡转账', value: 'closed' },
                { label: '解决中', value: 'processing' },
              ]}
            >
              closed
            </ProDescriptions.Item>
          </ProDescriptions>
      </Modal>
    </>
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
  cashModalVisible:accountAndcenter.cashModalVisible
}))(Projects);
