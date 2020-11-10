<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h2 class="mt-5">用戶訂單列表</h2>
    <div class=" d-lg-block d-none">
      <div class="mt-5 row justify-content-center mx-0">
        <div class="col-md-10">
          <table class="table">
            <thead>
              <tr>
                <th width="200px">購買時間</th>
                <th width="250px">購買方式</th>
                <th width="400px">商品列表</th>
                <th width="400px">數量</th>
                <th width="350px">使用優惠卷</th>
                <th width="200px">應付金額</th>
                <th width="200px">付款狀態</th>
                <th width="200px">結帳</th>
              </tr>
            </thead>
            <tbody  v-if="orders">
              <tr>
                <td class="align-middle">
                    {{datetime}}
                </td>
                <td class="align-middle" >
                    {{orders.payment}}
                </td>
                <td  class="align-middle">
                  <ul class="list-unstyled" v-for="(product, i) in orders.products" :key="i" >
                    <li>{{ product.product.title }}</li>
                  </ul>
                </td>
                <td  class="align-middle">
                  <ul class="list-unstyled" v-for="(product, i) in orders.products" :key="i">
                    <li> 數量：{{ product.quantity }}{{ product.product.unit }}</li>
                  </ul>
                </td>
                <td class="align-middle" >
                    <strong v-if="orders.coupon">是</strong>
                    <span v-else>否</span>
                </td>
                <td class="align-middle" >
                    {{ Math.round(orders.amount) | money}}
                </td>
                <td class="align-middle" >
                    <strong v-if="!orders.paid">未付款</strong>
                    <span v-else>已付款</span>
                </td>
                <td class="align-middle" >
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-primary" :disabled="orders.paid" @click.prevent="goPage(orders)">去付款</button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="w-100 mt-5">
        </div>
      </div>
    </div>
    <div class=" d-block d-lg-none">
      <div class="mt-5 row justify-content-center mx-0">
        <div class="col-md-10">
          <div class="border p-4 mb-4">
              <table class="table text-muted border-bottom">
                <tbody  v-if="orders">
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal text-left">購買時間</th>
                    <td class="text-right border-0 px-0 pt-4">{{datetime}}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 font-weight-normal text-left">購買方式</th>
                    <td class="text-right border-0 px-0" >{{orders.payment}}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 font-weight-normal ">商品列表</th>
                    <th scope="row" class="border-0 px-0 font-weight-normal ">數量</th>
                  </tr>
                  <tr>
                    <td class="align-middle">
                      <ul class="list-unstyled" v-for="(product, i) in orders.products" :key="i" >
                        <li>{{ product.product.title }}</li>
                      </ul>
                    </td>
                    <td class="align-middle">
                      <ul class="list-unstyled" v-for="(product, i) in orders.products" :key="i">
                        <li> 數量：{{ product.quantity }}{{ product.product.unit }}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 font-weight-normal text-left">使用優惠卷</th>
                    <td class="text-right border-0 px-0" >
                      <strong v-if="orders.coupon">是</strong>
                      <span v-else>否</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 font-weight-normal text-left">應付金額</th>
                    <td class="text-right border-0 px-0">{{ Math.round(orders.amount) | money}}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 font-weight-normal text-left">付款狀態</th>
                    <td class="text-right border-0 px-0">
                      <strong v-if="!orders.paid">未付款</strong>
                      <span v-else>已付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 font-weight-normal text-left">結帳</th>
                    <td class="text-right border-0 px-0">
                      <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-dark" :disabled="orders.paid" @click.prevent="goPage(orders)">去付款</button>
                    </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      orders: [],
      datetime: ''
    }
  },
  methods: {
    getOrders () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`
      this.$http.get(url).then(res => {
        this.orders = res.data.data[0]
        this.datetime = res.data.data[0].created.datetime
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        if (error.response.request.status === 404) {
          this.$bus.$emit('message:push', `${error.response.request.status} 找不到頁面`, 'danger')
        } else {
          this.$bus.$emit('message:push', `${error.response.request.status}${error.response.data.message}`, 'danger')
        }
      })
    },
    goPage (orders) {
      this.$router.push(`/payorder/${orders.id}`)
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
