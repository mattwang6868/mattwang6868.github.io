<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h2>用戶訂單列表</h2>
    <div class="mt-5 row justify-content-center">
      <div class="col-md-10">
        <table class="table">
          <thead>
            <tr>
              <th width="200px">購買時間</th>
              <th width="200px">購買方式</th>
              <th width="250px">商品列表</th>
              <th width="180px">數量</th>
              <th width="180px">使用優惠卷</th>
              <th width="120px">應付金額</th>
              <th width="200px">付款狀態</th>
              <th width="200px">結帳</th>
            </tr>
          </thead>
          <tbody  v-if="orders.length">
            <tr v-for = "(item, key) in orders" :key="key">
              <td class="align-middle">
                  {{item.created.datetime}}
              </td>
              <td class="align-middle" >
                  {{item.payment}}
              </td>
              <td>
                <ul class="list-unstyled" v-for="(product, i) in item.products" :key="i">
                  <li>
                    {{ product.product.title }}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-unstyled" v-for="(product, i) in item.products" :key="i">
                  <li>{{ product.quantity }}{{ product.product.unit }}</li>
                </ul>
              </td>
              <td class="align-middle" >
                  <strong v-if="item.coupon">是</strong>
                  <span v-else>否</span>
              </td>
              <td class="align-middle" >
                  {{Math.round(item.amount) | money}}
              </td>
              <td class="align-middle" >
                  <strong v-if="!item.paid">未付款</strong>
                  <span v-else>已付款</span>
              </td>
              <td class="align-middle" >
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" :disabled="item.paid" @click.prevent="goPage(item)">去付款</button>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
        <hr class="w-100 mt-5">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      orders: [],
      orderId: ''
    }
  },
  methods: {
    getOrders () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`
      this.$http.get(url).then(res => {
        this.orders = res.data.data
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '無法取得訂單列表', 'danger')
      })
    },
    goPage (item) {
      this.$router.push(`/admin/customer_payorder/${item.id}`)
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
