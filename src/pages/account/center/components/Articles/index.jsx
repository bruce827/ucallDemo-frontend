import { StarTwoTone, LikeOutlined, MessageFilled, PlusOutlined } from '@ant-design/icons';
import { List, Tag, Button, Space } from 'antd';
import React from 'react';
import { connect } from 'umi';
import ArticleListContent from '../ArticleListContent';
import styles from './index.less';

import ProTable, { TableDropdown } from '@ant-design/pro-table';

const stateMapping = ['ok','reject','reviewing']
const defaultData = ()=>{
  let _list = []
  for(let i = 1;i<21;i++){
    _list.push({
      id:i,
      index:i,
      // 成单号
      code:'testCode'+i,
      // 产品名称
      title:'嘉华怡宝可能还会长一些',
      // 佣金
      cost:(Math.random()*100).toFixed(2),
      // 状态
      state:stateMapping[Math.floor(Math.random()*3)],
      // 标签
      labels:[],
      // 数据更新时间
      created_at:'2020-12-12 19:23:11',
    })
  }
  return _list
}
const columns = [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: '成单号',
    dataIndex: 'code',
    copyable: true,
    ellipsis: true,
    // width: 100,
    hideInSearch: true,
  },
  {
    title: '产品名称',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    // width: 200,
    hideInSearch: true,
  },
  {
    title: '佣金',
    dataIndex: 'cost',
    width: 100,
    valueType: 'money',
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
    valueEnum: {
      reviewing: {
        text: '审核中',
        status: 'Default',
      },
      reject: {
        text: '退款',
        status: 'Error',
      },
      ok: {
        text: '已成单',
        status: 'Success',
      },
    },
  },
  {
    title: '排序方式',
    key: 'direction',
    hideInTable: true,
    dataIndex: 'direction',
    filters: true,
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
  },
  {
    title: '更新时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
  },
  // {
  //   title: 'option',
  //   valueType: 'option',
  //   dataIndex: 'id',
  //   render: (text, row) => [
  //     <a href={row.html_url} target="_blank" rel="noopener noreferrer">
  //       查看
  //     </a>,
  //     <TableDropdown
  //       onSelect={(key) => window.alert(key)}
  //       menus={[
  //         {
  //           key: 'copy',
  //           name: '复制',
  //         },
  //         {
  //           key: 'delete',
  //           name: '删除',
  //         },
  //       ]}
  //     />,
  //   ],
  // },
];

const Articles = (props) => {
  const { list } = props;

  const IconText = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );

  return (
    <ProTable
      columns={columns}
      // request={async (params = {}) =>
      //   request('https://proapi.azurewebsites.net/github/issues', {
      //     params,
      //   })
      // }
      // defaultData={()=>{
      //   debugger
      //   defaultData()
      // }}
      rowKey="id"
      dataSource={defaultData()}
      // dateFormatter="string"
      headerTitle="成单记录"
      search={{
        collapsed: true,
        optionRender: ({ searchText, resetText }, { form }) => [
          <a style={{marginRight:8}}
            onClick={() => {
              form?.submit();
            }}
          >
            {searchText}
          </a>,
          <a style={{marginRight:8}}
            onClick={() => {
              form?.resetFields();
            }}
          >
            {resetText}
          </a>,
          <a>导出</a>,
        ],
      }}
      // toolBarRender={() => [
      //   <Button key="3" type="primary">
      //     <PlusOutlined />
      //     新建
      //   </Button>,
      // ]}
      options={{
        fullScreen:false,
        reload:false,
      }}
    />
    // <List
    //   size="large"
    //   className={styles.articleList}
    //   rowKey="id"
    //   itemLayout="vertical"
    //   dataSource={list}
    //   renderItem={item => (
    //     <List.Item
    //       key={item.id}
    //       actions={[
    //         <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
    //         <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
    //         <IconText key="message" icon={<MessageFilled />} text={item.message} />,
    //       ]}
    //     >
    //       <List.Item.Meta
    //         title={
    //           <a className={styles.listItemMetaTitle} href={item.href}>
    //             {item.title}
    //           </a>
    //         }
    //         description={
    //           <span>
    //             <Tag>Ant Design</Tag>
    //             <Tag>设计语言</Tag>
    //             <Tag>蚂蚁金服</Tag>
    //           </span>
    //         }
    //       />
    //       <ArticleListContent data={item} />
    //     </List.Item>
    //   )}
    // />
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
}))(Articles);
