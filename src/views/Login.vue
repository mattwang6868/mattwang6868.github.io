<template>
  <div class="row d-flex justify-content-center">
    <loading :active.sync="isLoading"></loading>
    <div class="col-4">
      <form class="form-signin" @submit.prevent="signin">
        <h1 class="h3 m-5 font-weight-normal">請先登入</h1>
        <div class="form-group">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input id="inputEmail" v-model="user.email" type="email" class="form-control" placeholder="Email address" required autofocus>
        </div>
        <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input id="inputPassword" v-model="user.password" type="password" class="form-control" placeholder="Password" required>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" >
          登入
        </button>
        <button class="btn btn-lg btn-info btn-block" type="submit" @click = 'signout'>
          登出
        </button>
        <button class="btn btn-lg btn-secondary btn-block" type="submit" @click = 'getData'>
          取得資料
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      this.isLoading = true
      const loginApi = `${process.env.VUE_APP_APIPATH}/api/auth/login`
      const api = this.user
      this.$http.post(loginApi, api).then(res => {
        const myToken = res.data.token
        const expired = res.data.expired
        document.cookie = `hexHomeToken=${myToken}; expires=${new Date(expired * 1000)}; `
        this.$bus.$emit('message:push', '登入成功', 'success')
        this.$router.push('admin')
        this.isLoading = false
      })
        .catch((error) => {
          this.isLoading = false
          this.$bus.$emit('message:push', `登入失敗，系統資訊: ${error.response.data.message}`, 'danger')
        })
    },
    signout () {
      document.cookie = 'hexHomeToken=;expires=;'
    },
    getData () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexHomeToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${token}`
      console.log('token', token)
    }
  },
  created () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>
