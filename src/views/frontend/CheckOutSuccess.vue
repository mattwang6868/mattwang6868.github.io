<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="position-relative">
      <div class="position-absolute" style="top:0; bottom:0; left:0; right:0;
      background-image: url(https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=60);
      background-position: center center; opacity: 0.3;"></div>
      <div class="container d-flex flex-column" style="min-height: 80vh;">
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center" v-if="order.paid">
            <h1 class="text-dark font-weight-bolder">付款成功</h1>
            <div class="mt-5" >
              <button class="btn btn-secondary rounded-0 w-50" @click="goPage('products')">繼 續 逛 逛</button>
            </div>
          </div>
          <div class="col-md-4 text-center" v-else>
            <h1 class="text-dark font-weight-bolder">付款失敗</h1>
            <div class="mt-5" >
              <button class="btn btn-secondary rounded-0 w-50" @click="goPage('orders')">再試一次</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    getDetail (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${id}`
      this.$http.get(url).then(res => {
        this.order = res.data.data
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '無法取得訂單資訊，請重新登入再次嘗試', 'danger')
      })
    },
    goPage (params) {
      this.$router.push(`/${params}`)
    }
  },
  created () {
    const id = this.$route.params.id
    this.orderId = id
    this.getDetail(id)
  }
}
</script>
