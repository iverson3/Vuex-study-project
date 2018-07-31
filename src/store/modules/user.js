import shop from '../../api/shop'
import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  accessToken: '',
  accessLiveTime: 0, // 登录状态到期时间
  userInfo: {
    uid: 0,
    username: '',
    phone: null,
    email: ''
  }
}

const getters = {
  getUserId: (state, getters, rootState) => {
    return state.userInfo.uid
  }
}

const actions = {
  login: function ({commit, state}, payload) {
    // context: commit dispatch getters state rootGetters rootState
    return new Promise((resolve, reject) => {
      Vue.http.post(
        '/api/test/vuex/login',
        {'username': payload.username, 'password': payload.password},
        {emulateJSON: true}
      )
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            commit('loginSuccess', res.data)
            resolve(true)
          } else {
            commit('loginError', res.error)
            resolve(false)
          }
        })
        .catch(err => {
          commit('loginError', err)
          reject()
        })
    })
  },
  logout ({ commit }) {
    Vue.http.post(
      '/api/test/vuex/logout',
      {},
      {emulateJSON: true}
    )
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          commit('logout')
        }
      })
  }
}

const mutations = {
  loginSuccess (state, data) {
    state.accessToken = data.remember_token
    state.accessLiveTime = data.access_live_time
    state.userInfo = {
      uid: data.id,
      username: data.name,
      phone: data.phone,
      email: data.email
    }
  },
  loginError (state, err) {
    console.log(err)
    state.accessToken = ''
    state.userInfo = {
      uid: 0,
      username: '',
      phone: null,
      email: ''
    }
  },
  logout (state) {
    state.accessToken = ''
    state.accessLiveTime = 0
    state.userInfo = {
      uid: 0,
      username: '',
      phone: null,
      email: ''
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
