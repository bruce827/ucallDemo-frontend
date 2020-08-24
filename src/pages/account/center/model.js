import { queryCurrent, queryFakeList } from './service';

const Model = {
  namespace: 'accountAndcenter',
  state: {
    currentUser: {},
    list: [],
    // 提现记录详情
    cashModalVisible:false,
    // 工单记录详情
    missionModalVisible:false
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    // *alertModalVisible({payload},{put}){

    //   yield put({
    //     type:'setModalVisible',
    //     payload:payload
    //   })
    // }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },
    // 改变提现详情模态状态
    setModalVisible(state,{payload}){
      return {
        ...state,
        ...payload
      }
    }
  },
};
export default Model;
