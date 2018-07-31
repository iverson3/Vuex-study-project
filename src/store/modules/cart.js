import shop from '../../api/shop'

const state = {
  cartlist: [],
  checkoutStatus: false
}

const getters = {
  cartProducts: (state, getters, rootState) => {
    if (state.cartlist.length === 0) {
      return []
    }
    return state.cartlist.map(({id, quantity}) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        id,
        proid: product.id,
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, cart) => {
      return total + cart.quantity * cart.price
    }, 0)
  }
}

const actions = {
  addProductToCart ({ commit, state }, product) {
    // context: commit dispatch getters state rootGetters rootState
    const cart = state.cartlist.find(item => item.id === product.id)
    if (cart) {
      commit('incrementItemQuantity', cart)
    } else {
      commit('pushProductToCart', { id: product.id })
    }
  },
  checkout ({commit, state}, products) {
    // 临时存放cartlist，用作下面checkout失败后的数据还原
    const tmpSaveCartList = [...state.cartlist]
    let cartlist = tmpSaveCartList
    commit('setCheckoutStatus', false)
    tmpSaveCartList.map(item => cartlist.splice(cartlist.findIndex(cart => cart.id === item.id), 1))
    console.log(cartlist)
    commit('setCartItems', cartlist)
    shop.buyProducts(
      products,
      () => commit('setCheckoutStatus', true),
      () => {
        commit('setCheckoutStatus', false)
        // checkout失败，则还原cartlist里面的数据
        commit('setCartItems', tmpSaveCartList)
      }
    )
  },
  removeCart ({ commit, state }, id) {
    commit('removeFromCart', id)
  }
}

const mutations = {
  pushProductToCart (state, { id }) {
    state.cartlist.push({
      id,
      quantity: 1
    })
  },
  incrementItemQuantity (state, { id }) {
    const cart = state.cartlist.find(item => item.id === id)
    cart.quantity++
  },
  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  },
  setCartItems (state, cartlist) {
    state.cartlist = cartlist
  },
  removeFromCart (state, id) {
    state.cartlist.splice(state.cartlist.findIndex(cart => cart.id === id), 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
