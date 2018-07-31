import shop from '../../api/shop'
import * as types from '../mutation-types'
import Vue from 'vue'

// initial state
const state = {
  all: [],

  testData: null,
  testGoodsList: [],
  orderby: 'price',
  page: 1,
  pageSize: 5,
  isShowLoadMore: true,
  isLoading: false,
  orderNames: {
    'created_at': '时间',
    'sold_num': '销售量',
    'price': '价格',
    'rate': '评分'
  }
}

// getters
const getters = {
  curOrderName: (state) => {
    return state.orderNames[state.orderby]
  }
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products)
    })
  },
  /**
   store.dispatch('getDataTest2').then((res) => {
      // 成功之后需要执行的逻辑代码
   })
  */
  getDataTest2: function ({commit}, payload) {
    return new Promise((resolve, reject) => {
      // emulateJSON参数改变请求参数的编码格式
      Vue.http.post(
        '/index.php?s=/addon/Show/Show/getdatatest',
        {'id': payload.id, 'order': payload.order},
        {emulateJSON: true}
      )
        .then(res => res.json())
        .then(res => {
          // resolve(res.data)
          commit('getDataSuccess', res.data)
          resolve(res)
        })
        .catch(err => {
          commit('getDataError', err)
          reject(err)
        })
    })
  },

  getDataTest ({commit}, payload) {
    Vue.http.post(
      '/api/test/vuex/getdatatest',
      {'id': payload.id, 'order': payload.order},
      {emulateJSON: true}
    )
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          commit('getDataSuccess', res.data)
        } else {
          commit('getDataError', res.error)
        }
      })
      .catch(err => {
        commit('getDataError', err)
      })
  },
  getGoodsList ({commit, state}, payload) {
    commit('changeLoading', true)
    Vue.http.post(
      '/api/test/vuex/getGoodsList',
      {'page': state.page, 'pagesize': state.pageSize, 'orderby': state.orderby},
      {emulateJSON: true}
    )
      .then(res => res.json())
      .then(res => {
        commit('changeLoading', false)
        if (res.success) {
          if (!res.data.next_page_url) {
            commit('changeLoadMore', false)
          }
          commit('changePage', state.page + 1)
          commit('getGoodsSuccess', res.data.data)
        } else {
          // commit('getGoodsError', res.error)
        }
      })
      .catch(err => {
        commit('changeLoading', false)
        // commit('getGoodsError', err)
      })
  },
  initData ({commit}) {
    commit('clearGoodsList')
    commit('changeLoadMore', true)
    commit('changePage', 1)
    commit('changeLoading', false)
  }
}

// mutations
const mutations = {
  setProducts (state, products) {
    state.all = products
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  },

  [types.GET_DATA_SUCCESS] (state, data) {
    state.testData = {'id': parseInt(data.id), 'order': data.order}
  },
  [types.GET_DATA_ERROR] (state, err) {
    console.log(err)
    state.testData = null
  },
  getGoodsSuccess (state, data) {
    state.testGoodsList = state.testGoodsList.concat(data)
  },
  clearGoodsList (state) {
    state.testGoodsList = []
    state.orderby = 'sold_num'
  },
  changeLoadMore (state, status) {
    state.isShowLoadMore = status
  },
  changeLoading (state, status) {
    state.isLoading = status
  },
  setOrderby (state, orderby) {
    state.page = 1
    state.testGoodsList = []
    state.orderby = orderby
  },
  changePage (state, page) {
    state.page = page
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
