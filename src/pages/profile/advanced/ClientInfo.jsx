import { Drawer, Form, Button, Col, Row, Input, Select,DatePicker, Cascader,Divider,List,Typography,Rate } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const dropdownRender=(menus)=> {
  return (
    <div>
      {menus}
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: 8 }}>注意：此选项决定了您的任务分类</div>
    </div>
  );
}

const options = [
  {
    value: '新任务',
    label: '新任务',
    disabled: true,
  },
  {
    value: '跟进中',
    label: '跟进中',
    children: [
      {
        value: '开场白',
        label: '开场白',
        
      },
      {
        value: '持续跟进',
        label: '持续跟进',
        
      },
      {
        value: '竞品比价',
        label: '竞品比价',
        
      },
      {
        value: '无状态',
        label: '无状态',
      },
    ],
  },
  {
    value: '已完成',
    label: '已完成',
    children: [
      {
        value: '拒绝',
        label: '拒绝',
        
      },
      {
        value: '号码错误',
        label: '号码错误',
      },
      {
        value: '其它原因',
        label: '其它原因',
      },
    ],
  },
  {
    value: '已出单',
    label: '已出单',
    children: [
      {
        value: '其他机会',
        label: '其他机会',
        
      },
      {
        value: '出单完成',
        label: '出单完成',
      },
      {
        value: '再次出单',
        label: '再次出单',
        disabled:true
      },
    ]
  }
];
const data = [
  '安联优越',
  '传富未来',
  '中英爱永恒终身寿险',
  '复星联合星相印重大疾病保险优享计划',
  '平安诉讼财产保全责任保险'
]
const formStateMap = new Map([
  ['新任务',{

  }],['跟进中',{

  }],['已出单',{

  }]
])
class ClientInfo extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  state = { 
    // visible: this.props.visible.clientInfoVisible 
    alreadyProductListVisible:false,
    missionFlag:{
      state:null,
      // 出售产品
      showProductSelect:true,
    }
  };
  
  DrawerTitle = (state)=>(
    <>
    <span>客户跟进记录</span>
    <Select 
      name="" 
      id="" 
      placeholder='当前任务状态' 
      value={state}
      onChange={(value)=>{
        let missionFlag = {
          state:value
        }
        this.setState({
          missionFlag
        })
      }}
      style={{float:"right",marginRight:28}}>
      <Select.Option value='新任务'>新任务</Select.Option>
      <Select.Option value='跟进中'>跟进中</Select.Option>
      <Select.Option value='已完成' disabled>已完成</Select.Option>
      <Select.Option value='已出单'>已出单</Select.Option>
    </Select>
    </>
  )
  // showDrawer = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  onClose = () => {
    // this.setState({
    //   visible: false,
    // });
    const {onClose}=this.props
    onClose()
  };

  onChildrenDrawerClose = () => {
    this.setState({
      alreadyProductListVisible: false,
    });
  };
  render() {
    // console.log(this.props);
    const{visible}=this.props
    const{
      alreadyProductListVisible,
      missionFlag:{
        state,
        showProductSelect}} =this.state
    // debugger
    return (
      <>
        {/* <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> New account
        </Button> */}
        <Drawer
          title={this.DrawerTitle(state)}
          width={720}
          onClose={this.onClose}
          visible={visible}
          // visible={true}

          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.onClose} type="primary">
                完成
              </Button>
            </div>
          }
        >
          <Form layout="vertical" >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="通话结束标记"
                  label="通话结束标记"
                  rules={[{ required: true, message: '请务必选择一个结束状态' }]}
                >
                  <Cascader
                    options={options} 
                    dropdownRender={dropdownRender}
                    onChange={(value)=>{
                      if(value[0] == '已出单'){
                        let missionFlag = {
                          ...this.state.missionFlag,
                          showProductSelect :false
                        } 
                        this.setState({
                          missionFlag
                        })
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="出售产品"
                  label="出售产品"
                  required={false}
                  extra={(<span>更多出单产品请查看<a onClick={()=>{
                    this.setState({
                      alreadyProductListVisible:true
                    })
                  }}>出单记录</a></span>)}
                  rules={[{ required: false, message: 'Please choose the type' }]}
                >
                  <Select 
                    disabled={showProductSelect}
                    placeholder="请选择">
                  {data.map(item=>(
                    <Option value={item}>{item}</Option>
                  ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="用户评价"
                  label="用户评价"
                  required={true}
                  // rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Rate
                  allowHalf
                  defaultValue={1}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="预约时间"
                  label="预约时间"
                  extra={"已过期"}
                  rules={[{ required: false, message: 'haha' }]}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="备注"
                  label="备注"
                  required={false}
                  rules={[{ required: false, message: 'please enter url description' }]}
                >
                  <Input.TextArea rows={4} placeholder="准确详细的备注会让您获得更好的客户资源..." />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* 出单记录 */}
          <Drawer
            title="出单记录"
            width={360}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={alreadyProductListVisible}
          >
            <List
              header={<div>历史成单记录</div>}
              footer={<div>此表单只显示已成单的记录</div>}
              bordered
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Typography.Text mark>[2011/12/12]</Typography.Text> {item}
                </List.Item>
              )}
            />
          </Drawer>
        </Drawer>
      </>
    );
  }
}

export default ClientInfo;

