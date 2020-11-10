import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    cart: {},
    cartTotal: 0,
    cartlength: '0',
    favorite: JSON.parse(localStorage.getItem('listData')) || [],
    favoriteList: [],
    favoritelength: '0'
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getCart (context) {
      context.commit('LOADING', true)
      context.commit('CARTTOTAL', 0)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      axios.get(url).then(res => {
        context.commit('CART', res.data.data)
        context.commit('CART_TOTAL', res.data.data)
        context.commit('CART_LENGTH', res.data.data.length)
        context.commit('LOADING', false)
      })
    },
    addToFavorite (context, item) {
      context.commit('FAVORITE', item)
    },
    getFavoriteList (context, item) {
      context.commit('FAVORITE_LIST', item)
    },
    deleteFavorite (context, item) {
      context.commit('DELETE_FAVORITE', item)
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    CARTTOTAL (state, status) {
      state.cartTotal = status
    },
    CART (state, payload) {
      state.cart = payload
    },
    CART_LENGTH (state, payload) {
      state.cartlength = payload
    },
    CART_TOTAL (state, payload) {
      state.cartTotal = 0
      payload.forEach((item) => {
        state.cartTotal += item.product.price * item.quantity
      })
    },
    FAVORITE (state, payload) {
      state.favorite.push(payload)
      localStorage.setItem('listData', JSON.stringify(state.favorite))
      state.favoritelength = (state.favorite).length
    },
    FAVORITE_LIST (state, payload) {
      state.favoriteList = payload.filter((item) => {
        return state.favorite.indexOf(item.id) > -1
      })
    },
    DELETE_FAVORITE (state, payload) {
      console.log(payload)
      const favoriteid = state.favorite.indexOf(payload)
      if (favoriteid !== -1) {
        state.favorite.splice(favoriteid, 1)
      }
      localStorage.setItem('listData', JSON.stringify(state.favorite))
      state.favoritelength = JSON.parse(localStorage.getItem('listData')).length
    }
  },
  getters: {
    cart (state) {
      return state.cart
    },
    cartlength (state) {
      return state.cartlength
    },
    favorite (state) {
      return state.favorite
    },
    favoriteList (state) {
      return state.favoriteList
    },
    isLoading (state) {
      return state.isLoading
    }
  }
})
