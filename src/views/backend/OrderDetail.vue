<template>
    <div>
      <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">訂單詳情</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click="goPage()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="m-2 text-left" v-if="order.created">訂單編號{{order.created.timestamp}}</div>
                <span class="border-bottom"></span>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="border-0 text-left pl-5" width="400px">品名</th>
                      <th class="border-0" width="300px">數量</th>
                      <th class="border-0">單價</th>
                      <th class="border-0">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-bottom border-top"  v-for="i in productsLength" :key="i" >
                      <td class="border-0 px-0 font-weight-normal py-4 d-flex">
                        <img :src="order.products[ i -1 ].product.imageUrl[0]" alt="" style="width: 90px; height: 90px; object-fit: cover;" class="ml-5">
                        <p class="mb-0 font-weight-bold ml-3 d-inline-block mr-auto" >{{order.products[ i -1 ].product.title}}</p>
                      </td>
                      <td class="border-0 align-middle" style="max-width: 160px;">
                        <div class="input-group ">
                          <!-- <div class="input-group-prepend">
                            <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1" :disabled="order.products[ i -1 ].quantity === 1" @click="quantityUpdate(order.products[ i -1 ].quantity -1)">
                              <i class="fas fa-minus"></i>
                            </button>
                          </div> -->
                          <input type="text" class="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"
                          v-model="order.products[ i -1 ].quantity" >
                          <!-- <div class="input-group-append">
                            <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2"  @click="quantityUpdate(order.products[ i -1 ].quantity +1)">
                              <i class="fas fa-plus"></i>
                            </button>
                          </div> -->
                        </div>
                      </td>
                      <td class="border-0 align-middle"><p class="mb-0 ml-auto">{{order.products[ i -1 ].product.price}}</p></td>
                      <td class="border-0 align-middle"><p class="mb-0 ml-auto">{{order.products[ i -1 ].quantity * order.products[ i -1 ].product.price}}</p></td>
                    </tr>
                  </tbody>
                </table>
                <div class="p-4 mb-4" >
                  <h4 class="font-weight-bold mb-4 text-right">結 算</h4>
                  <div class="d-flex justify-content-between mt-4">
                    <p class="mb-0 h4 font-weight-bold">Total</p>
                    <p class="mb-0 h4 font-weight-bold">NT${{order.amount}}</p>
                  </div>
                </div>
                <div class="modal-footer">
                  <!-- <button type="button" class="btn btn-danger" data-dismiss="modal" @click="update()">更新訂單</button> -->
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="goPage()">Close</button>
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
        mount: '',
        coupon: {},
        created: {},
        id: '',
        message: '',
        paid: false,
        paid_at: '',
        paid_diff: '',
        payment: '',
        products: [],
        updated: {},
        user: {}
      },
      productsLength: '',
      orderId: ''
    }
  },
  methods: {
    getDetail (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${id}`
      this.$http.get(url).then(res => {
        this.order = res.data.data
        this.productsLength = res.data.data.products.length
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '取得訂單詳情失敗', 'danger')
      })
    },
    quantityUpdate () {

    },
    update () {

    },
    goPage () {
      this.$router.push('/admin/orders')
    }
  },
  created () {
    const id = this.$route.params.id
    this.orderId = id
    this.getDetail(id)
  }
}
</script>
