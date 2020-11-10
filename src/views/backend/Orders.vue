<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-5 row justify-content-center">
      <div class="col-md-8">
        <table class="table">
          <thead>
            <tr>
              <th width="200px">購買時間</th>
              <th width="200px">購買方式</th>
              <th width="250px">商品名稱</th>
              <th width="180px">數量</th>
              <th width="120px">應付金額</th>
              <th width="200px">付款狀態</th>
              <th width="200px">訂單詳情</th>
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
                  {{Math.round(item.amount) | money}}
              </td>
              <td class="align-middle" >
                  <strong v-if="!item.paid">未付款</strong>
                  <span v-else>已付款</span>
              </td>
              <td class="align-middle" >
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" :disabled="item.paid" @click.prevent="getDetailed(item.id)">選擇</button>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination :pages = "pagination" @update = "getOrders"></Pagination>
        <div id="orderModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <!-- <OrderModal :order="order" :status="status" ></OrderModal> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination.vue'
// import OrderModal from '@/components/backend/OrderModal.vue'

export default {
  components: {
    Pagination
    // OrderModal
  },
  data () {
    return {
      isLoading: false,
      pagination: {},
      orders: [],
      order: {
        created: {},
        products: []
      },
      orderId: '',
      status: {
        loadingItem: ''
      }

    }
  },
  methods: {
    getOrders (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders?page=${num}`
      this.$http.get(url).then(res => {
        this.orders = res.data.data
        this.pagination = res.data.meta.pagination
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '取得訂單列表失敗', 'danger')
      })
    },
    getDetailed (id) {
      this.$router.push(`/admin/order/${id}`)
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
