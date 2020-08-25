import {
  Avatar,
  Card,
  Col,
  List,
  Skeleton,
  Row,
  Statistic,
  Dropdown,
  Menu,
  Progress,
  DatePicker,
} from 'antd';
import React, { Component, Suspense } from 'react';
import { Link, connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import Radar from './components/Radar';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { DownOutlined } from '@ant-design/icons';
// 增加加载动画
import QueueAnim from 'rc-queue-anim';

// 仪表盘图表
import { Gauge } from './components/Charts';

// 销售排名
import SalesCard from '../analysis/components/SalesCard'
import {getTimeDistance} from './utils'

// 任务分类
import logo_0 from '../../../assets/myMission/新任务.svg';
import logo_1 from '../../../assets/myMission/预约任务.svg';
import logo_2 from '../../../assets/myMission/跟进中.svg';
import logo_3 from '../../../assets/myMission/已完成.svg';
import logo_4 from '../../../assets/myMission/已出单.svg';
import logo_5 from '../../../assets/myMission/敬请期待.svg';

// 任务到期时间logo
import mission_logo_7 from '@/assets/myMission/我的任务7天.svg';
import mission_logo_29 from '@/assets/myMission/我的任务29天.svg';
import mission_logo_90 from '@/assets/myMission/我的任务90天.svg';

import {history} from 'umi';

const A_mission_logo = [logo_0, logo_1, logo_2, logo_3, logo_4, logo_5];

const A_mission_logo_days = [mission_logo_7, mission_logo_29, mission_logo_90];

// 日期选择控件
const { RangePicker } = DatePicker;


const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }
  const sayHello =
    moment().hour() <= 9
      ? {
          hello: '早安',
          word: '美好的一天，从第一个电话开始！',
        }
      : {
          hello: '你好',
          word: '电话一响，黄金万两！',
        };

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={'/my.png'} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {sayHello.hello},{currentUser.name},{sayHello.word}
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="成保数" value={56} suffix="/ 192" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="站内排名" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="通话总时长(小时)" value={2223} />
    </div>
  </div>
);

// 我的任务扩展按钮
const MyMissionExtraButtons = (props) => {
  const { missionFlag, reSetMissionFlag } = props;
  if (missionFlag !== undefined) {
    return (
      <span>
        <a
          onClick={() => {
            reSetMissionFlag();
          }}
          style={{ paddingRight: '12px' }}
        >
          返回
        </a>
        <Link to="/">全部任务</Link>
      </span>
    );
  }
  return <Link to="/">全部任务</Link>;
};
// 任务详情
const ListContent = ({ data: { batchNum, createdAt, percent, status } }) => (
  <div className={styles.listContent}>
    {/* 批号 */}
    <div className={styles.listContentItem}>
      <span>批号</span>
      <p>{batchNum}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>分配时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>备注</span>
      <p>这是一个备注</p>
    </div>
  </div>
);
// 我的任务详情列表
const MissionList = (listData) => {
  let { lastCallStateMapping, changeCallState } = listData;
  let A_currentList = [];

  if (listData.list) {
    listData.list.forEach((element) => {
      if (element.title === listData.missionFlag) {
        A_currentList = element.missionList || [];
      }
    });
  }
  // 更多操作
  const MoreBtn = ({ item }) => {
    // let currentBtnTitle = lastCallStateMapping[item.lastCallState];
    return (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => changeCallState(key, item)}>
            {lastCallStateMapping.map((v, i) => (
              <Menu.Item key={i}>{v}</Menu.Item>
            ))}
          </Menu>
        }
      >
        <Link rel="stylesheet" href="" to="/callStudio" target="_blank">
          {/* <a onClick={()=>{
              const _origin = window.location.origin; 
              const _w = window.open(_origin)
              
              
            }}> */}
            {lastCallStateMapping[item.lastCallState]} <DownOutlined />
          {/* </a> */}
        </Link>
        
      </Dropdown>
    );
  };
  return (
    <List
      size="small"
      rowKey="id"
      dataSource={A_currentList}
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
              更多
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
              />
            }
            title={<a href={item.href}>{item.CName}</a>}
            description={item.tag}
            className={styles.tag}
          />
          <ListContent data={item} />
        </List.Item>
      )}
    />
  );
};
// 我的任务卡片更新时间组件
  const CardUpdate = ({item}) =>{
    // console.log(item);
    // debugger
    if(item.updatedAt && (item.title == '新任务')){
      return (
        <Link to={item.memberLink}>{item.addNum || 0} 条新增</Link>
      )
    }
    if(item.updatedAt && (item.title == '预约任务')){
      return (
        <Link to={item.memberLink}>{item.addNum || 20} 条预约</Link>
      )
    }

    return(
      <Link to={item.memberLink}> 最近更新</Link>
    )
  }

class Workplace extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    missionFlag: undefined,
    // 呼叫状态码表
    lastCallStateMapping: ['web呼叫', '软电话呼叫'],
    projectNotice: this.props.projectNotice,
    checkPresent: 23,
    // 销售类型
    salesType: 'all',
    // 当前tab页面
    currentTabKey: '',
    // 当前时间段
    rangePickerValue: getTimeDistance('year'),
  };
  // 异步获取任务列表后需要更新一下状态用于显示拨号方式
  componentWillReceiveProps(nextProps) {
    this.setState({
      projectNotice: nextProps.projectNotice,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });
  }

  // 实例销毁时清空数据
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  renderActivities = (item) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };
  // 图表当前时间段判断
  isActive = (type) => {
    const { rangePickerValue } = this.state;

    if (!rangePickerValue) {
      return '';
    }

    const value = getTimeDistance(type);

    if (!value) {
      return '';
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    // 只有日期相同才会显示主题色
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }

    return '';
  };
  // 时间选择控制器
  handleRangePickerChange = (rangePickerValue) => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    dispatch({
      type: 'dashboardAndanalysis/fetchSalesData',
    });
  };
  // 时间段选择控制器
  selectDate = (type) => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });
    dispatch({
      type: 'dashboardAndanalysis/fetchSalesData',
    });
  };

  render() {
    const {
      currentUser,
      projectLoading,
      // 销售排名数据
      dashboardAndanalysis,
    } = this.props;
    const {
      missionFlag,
      lastCallStateMapping,
      projectNotice,
      checkPresent,
      // 销售排名
      rangePickerValue,
      currentTabKey,
    } = this.state;
    const {
      salesData,
    } = dashboardAndanalysis;
    if (!currentUser || !currentUser.userid) {
      return null;
    }

    // 拨打电话方式切换
    const changeCallState = (key, item) => {
      let { projectNotice } = this.state;
      for (let i = 0; i < projectNotice.length; i++) {
        if (projectNotice[i].title === item.type) {
          for (let index = 0, len = projectNotice[i].missionList.length; index < len; index++) {
            if (projectNotice[i].missionList[index].id == item.id) {
              projectNotice[i].missionList[index].lastCallState = key;
              break;
            }
          }
        }
      }

      this.setState({
        projectNotice: projectNotice,
      });
    };
    
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            {/* 我的任务 */}
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title={!missionFlag ? '我的任务' : '我的任务/' + missionFlag}
              bordered={false}
              extra={
                <MyMissionExtraButtons
                  missionFlag={missionFlag}
                  reSetMissionFlag={() => {
                    this.setState({
                      missionFlag: undefined,
                    });
                  }}
                />
              }
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
                height: 288,
                overflow: !missionFlag ? 'hidden' : 'auto',
              }}
            >
              {/* 当点击任务类别时显示当前任务列表 */}
              <QueueAnim
                type={['right', 'left']}
                ease={['easeInOutQuart', 'easeInOutQuart']}
                duration={[600, 400]}
                interval={[500, 200]}
              >
                {missionFlag ? (
                  <MissionList
                    list={projectNotice}
                    missionFlag={missionFlag}
                    lastCallStateMapping={lastCallStateMapping}
                    changeCallState={changeCallState}
                  />
                ) : (
                  projectNotice.map((item, index) => (
                    <Card.Grid className={styles.projectGrid} key={item.id}>
                      <Card
                        bodyStyle={{
                          padding: 0,
                        }}
                        bordered={false}
                      >
                        <Card.Meta
                          title={
                            <div className={styles.cardTitle}>
                              <Avatar size="small" src={A_mission_logo[index]} />
                              <a
                                onClick={() => {
                                  this.setState({
                                    missionFlag: item.title,
                                  });
                                }}
                              >
                                {item.title + (item.num !== null ? `(${item.num})` : '')}
                              </a>
                            </div>
                          }
                          description={item.description}
                        />
                        <div className={styles.projectItemContent}>
                          {/* <Link to={item.memberLink}>{item.addNum || 0} 条新增</Link> */}
                          <CardUpdate
                            item={item}
                          />
                          {item.updatedAt && (
                            <span className={styles.datetime} title={item.updatedAt}>
                              {item.title == '预约任务'? "今日" : moment(item.updatedAt).fromNow()}
                            </span>
                          )}
                        </div>
                      </Card>
                    </Card.Grid>
                  ))
                )}
              </QueueAnim>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            {/* 质检结果 */}
            <Card
              style={{
                marginBottom: 24,
              }}
              title="质检合格率"
              bordered={false}
              bodyStyle={{
                padding: 0,
                height: 288,
                textAlign: 'center',
              }}
            >
              {/* 日期选择 */}
              <RangePicker
                style={{
                  marginTop: '10px',
                }}
                placeholder={['起始日期', '结束日期']}
                onCalendarChange={(dates) => {
                  this.setState({
                    checkPresent: Math.floor(Math.random() * 100),
                  });
                }}
              />
              <Gauge title={'质检合格率'} height={230} percent={checkPresent} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            {/* 销量排名 */}
              <SalesCard
                rangePickerValue={rangePickerValue}
                salesData={salesData}
                isActive={this.isActive}
                handleRangePickerChange={this.handleRangePickerChange}
                // loading={loading}
                selectDate={this.selectDate}
              />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    dashboardAndworkplace: { currentUser, projectNotice, activities, radarData },
    loading,
    dashboardAndanalysis,
  }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['dashboardAndworkplace/fetchUserCurrent'],
    projectLoading: loading.effects['dashboardAndworkplace/fetchProjectNotice'],
    activitiesLoading: loading.effects['dashboardAndworkplace/fetchActivitiesList'],
    dashboardAndanalysis,
  }),
)(Workplace);
