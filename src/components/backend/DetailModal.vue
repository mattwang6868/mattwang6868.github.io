<template>
  <div>
    <div class="modal-dialog">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{tempProduct.title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div style="height: 250px; background-size: cover; background-position: center;" :style="tempProduct.bgImage"></div>
          {{tempProduct.description}}
        </div>
        <div class="p-3">
          <div v-if="!tempProduct.price">
            {{tempProduct.origin_price}}
          </div>
          <div v-else class="d-flex align-items-baseline justify-content-between">
            <del class="text-info">原價{{tempProduct.origin_price}}</del>
            <div class="font-weight-bolder h5 text-danger">
              現在只要{{tempProduct.price}}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <select  class="form-control mt-3" v-model="num">
            <option value="0" disabled selected>請選擇數量</option>
            <option :value="num" v-for = "num in 10" :key = "num">{{ num }}</option>
          </select>
          <div>
            <p>小記 {{num * tempProduct.price}} </p>
          </div>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click = "modalAddToCart(tempProduct.id)" :disabled="num === 0">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if = "status.loadingItem == tempProduct.id"></span>
            加到購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tempProduct', 'status'],
  data () {
    return {
      num: 0,
      product: {},
      cart: {}
    }
  },
  methods: {
    modalAddToCart (id) {
      this.status.loadingItem = id
      const cart = {
        product: id,
        quantity: this.num
      }
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.post(url, cart).then(res => {
        console.log(res)
        this.status.loadingItem = ''
        this.isLoading = false
        this.$bus.$emit('message:push', '已加入購物車', 'success')
        this.$emit('modaltocart')
      }).catch((error) => {
        this.status.loadingItem = ''
        console.log(error.response.data.errors)
        this.$bus.$emit('message:push', `加入失敗，${error.response.data.errors}`, 'danger')
        this.isLoading = false
        this.$emit('modaltocart')
      })
    }
  }
}
</script>
