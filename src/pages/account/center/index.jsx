import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined,ClockCircleOutlined,CheckOutlined,AccountBookOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag,Timeline } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect } from 'umi';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import OperationModal from '@/pages/list/basic-list/components/OperationModal'
import styles from './Center.less';

// 头像
import myAvatar from '@/assets/myAvatar2.png'

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        成单记录{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        工单管理{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        提现记录{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
];

const TagList = ({ tags }) => {
  const ref = useRef(null);
  const [newTags, setNewTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showInput = () => {
    setInputVisible(true);

    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];

    if (inputValue && tempsTags.filter(tag => tag.label === inputValue).length === 0) {
      tempsTags = [
        ...tempsTags,
        {
          key: `new-${tempsTags.length}`,
          label: inputValue,
        },
      ];
    }

    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map(item => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{
            borderStyle: 'dashed',
          }}
        >
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

class Center extends Component {
  // static getDerivedStateFromProps(
  //   props: accountAndcenterProps,
  //   state: accountAndcenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;
  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }
  //   return null;
  // }
  state = {
    tabKey: 'articles',
    done:false,
    visible:false,
    current:undefined
  };

  input = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetch',
    });
  }

  onTabChange = key => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = tabKey => {
    // 提现记录
    if (tabKey === 'projects') {
      return <Projects />;
    }
    // 工单管理
    if (tabKey === 'applications') {
      return <Applications />;
    }
    // 成单记录
    if (tabKey === 'articles') {
      return <Articles />;
    }

    return null;
  };

  renderUserInfo = currentUser => (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.title}
      </p>
      <p>
        <ClusterOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.group}
      </p>
      <p>
        <HomeOutlined
          style={{
            marginRight: 8,
          }}
        />
        {
          (
            currentUser.geographic || {
              province: {
                label: '',
              },
            }
          ).province.label
        }
        {
          (
            currentUser.geographic || {
              city: {
                label: '',
              },
            }
          ).city.label
        }
      </p>
      <p>
        <AccountBookOutlined
          style={{
            marginRight: 8,
          }}
        />
        {
          "¥"+currentUser.myProperty.total
        }
        <span><a onClick={()=>(this.setState({visible:true}))} style={{fontSize:12}}> 提现</a></span>
      </p>
    </div>
  );

  render() {
    const { tabKey,done,current,visible } = this.state;
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    
    const handleCancel = () => {
      // setAddBtnblur();
      this.setState({
        visible:false
      })
    };
    return (
      <GridContent>
        <Row gutter={24}>
          {/* 左侧个人简介 */}
          <Col lg={6} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    {/* <img alt="" src={currentUser.avatar} /> */}
                    <Avatar shape="circle" size={"large"} src={myAvatar}/>
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  {this.renderUserInfo(currentUser)}
                  <Divider dashed />
                  {/* <TagList tags={currentUser.tags || []} /> */}
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>资产流水</div>
                    <Row gutter={36}>
                      {currentUser.myProperty &&
                        (
                          <Col lg={24} xl={24} >
                            <Timeline 
                              mode="left"
                              >
                              <Timeline.Item color={"gray"}>2019-09-09 资金转入¥200</Timeline.Item>
                              {/* <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item> */}
                              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                              2019-09-09 提现工单申请
                              </Timeline.Item>
                              <Timeline.Item color="red">2015-09-01 拒绝</Timeline.Item>
                              {/* <Timeline.Item color="gray">2015-09-01 </Timeline.Item> */}
                              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                                2015-09-01 提现工单申请
                              </Timeline.Item>
                              <Timeline.Item 
                                dot={<CheckOutlined style={{ fontSize: '16px' }}/>} 
                                >
                                2015-09-01 成功提现¥299 
                              </Timeline.Item>
                            </Timeline>
                          </Col>
                        )
                      }
                    </Row>
                  </div>
                  {/* <Divider
                    style={{
                      marginTop: 16,
                    }}
                    dashed
                  /> */}
                  {/* <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map(item => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div> */}
                </div>
              )}
            </Card>
          </Col>
          {/* 右侧Tab页 */}
          <Col lg={18} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
        <OperationModal
          done={done}
          current={current}
          visible={visible}
          // onDone={handleDone}
          onCancel={handleCancel}
          // onSubmit={handleSubmit}
        />
      </GridContent>
    );
  }
}

export default connect(({ loading, accountAndcenter }) => ({
  currentUser: accountAndcenter.currentUser,
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
}))(Center);
