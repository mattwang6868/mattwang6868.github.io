<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-5 row  justify-content-center">
      <form class="col-md-6 " @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th width="200px">品名</th>
            <th width="200px">數量</th>
            <th width="200px">單價</th>
          </thead>
          <tbody>
            <tr v-for="(item, key) in order.products" :key="key" >
              <td class="align-middle">
                {{ item.product.title }}
              </td>
              <td class="align-middle">
                {{ item.quantity }} / {{ item.product.unit }}
              </td>
              <td class="align-middle">
                {{ item.product.price |money }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">
                總計
              </td>
              <td class="text-right">
                {{ Math.round(order.amount) | money}}
              </td>
            </tr>
          </tfoot>
        </table>
        <table class="table">
        <tbody>
          <tr >
            <th width="100">
              Email
            </th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.paid">尚未付款</span>
              <span
                v-else
                class="text-success"
              >付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="order.paid === false"
        class="text-right"
      >
        <button class="btn btn-danger">
          確認付款去
        </button>
      </div>
      </form>
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
        this.$bus.$emit('message:push', '無法取得訂單付款資訊', 'danger')
      })
    },
    payOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}/paying`
      this.$http.post(url).then(res => {
        if (res.data.data.paid) {
          this.getDetail(this.orderId)
          this.isLoading = false
        }
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '無法付款', 'danger')
      })
    }
  },
  created () {
    const id = this.$route.params.id
    this.orderId = id
    this.getDetail(id)
  }

}
</script>
