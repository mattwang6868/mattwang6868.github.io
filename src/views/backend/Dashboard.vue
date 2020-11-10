<template>
  <div>
    <h2>這是後台</h2>
    <router-link to="/admin/products">後台產品列表</router-link> |
    <router-link to="/admin/coupons">優惠卷列表</router-link> |
    <router-link to="/admin/orders">後台訂單列表</router-link> |
    <router-link to="/admin/customer_orders">模擬下單系統</router-link> |
    <router-link to="/admin/customer_checkout">模擬用戶訂單列表</router-link> |
    <router-link to="/admin/storages">圖片列表</router-link> |
    <router-view V-if ="checkSuccess" />
  </div>

</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexHomeToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`
      this.$http.post(api, { api_token: this.token }).then(res => {
        this.checkSuccess = true
      }).catch(error => {
        this.$bus.$emit('message:push', `登入失敗，系統資訊: ${error.response.data.message}`, 'danger')
        this.$router.push('/login')
      })
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
