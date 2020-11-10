<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container" v-if="cart.length">
      <div class="mt-3">
        <h3 class="mt-3 mb-4">購物車列表</h3>
        <div class="row">
          <div class="col-md-8">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 pl-0">品名</th>
                  <th scope="col" class="border-0">數量</th>
                  <th scope="col" class="border-0">單價</th>
                  <th scope="col" class="border-0">刪除</th>
                </tr>
              </thead>
              <tbody v-if="cart.length">
                <tr class="border-bottom border-top" v-for="item in cart" :key="item.product.id">
                  <th scope="row" class="border-0 px-0 font-weight-normal py-4 text-left">
                    <img :src="item.product.imageUrl[0]"  alt="" style="width: 72px; height: 72px; object-fit: cover;">
                    <p class="mb-0 font-weight-bold ml-3 d-inline-block">{{item.product.title}}</p>
                  </th>
                  <td class="border-0 align-middle" style="max-width: 160px;">
                    <div class="input-group ">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1" :disabled="item.quantity === 1" @click="quantityUpdate(item.quantity -1,item.product.id)">
                          <i class="fas fa-minus"></i>
                        </button>
                      </div>
                      <input type="text" class="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"
                      :value="item.quantity" @keyup.enter="quantityUpdate($event.target.value,item.product.id )">
                      <div class="input-group-append">
                        <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2"  @click="quantityUpdate(item.quantity +1,item.product.id)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="border-0 align-middle"><p class="mb-0 ml-auto">{{item.product.price | money}}</p></td>
                  <td class="border-0 align-middle">
                    <button class="btn btn-outline-dark border-0 py-2" type="button" @click="removeCartItem(item.product.id)">
                      <i class="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="input-group w-50">
              <input type="text"  v-model="coupon_code" class="form-control rounded-0 border-bottom border-top-0 border-left-0 border-right-0 shadow-none" placeholder="套用優惠碼" aria-label="Recipient's username" aria-describedby="button-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchCoupon">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border p-4 mb-4">
              <h4 class="font-weight-bold mb-4">購物車明細</h4>
              <table class="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal text-left">商品金額</th>
                    <td class="text-right border-0 px-0 pt-4">NT{{cartTotal | money}}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 font-weight-normal text-left">折扣金額</th>
                    <td class="text-right border-0 px-0 " v-if="couponPercent">NT{{  Math.floor(cartTotal*(100-couponPercent)/100) | money }}</td>
                    <td class="text-right border-0 px-0 " v-else>NT{{  Math.floor(cartTotal*couponPercent) | money }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="!couponPercent" class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 font-weight-bold">總計</p>
                <p class="mb-0 h4 font-weight-bold">NT{{cartTotal | money}}</p>
              </div>
              <div v-else class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 font-weight-bold">總計</p>
                <p class="mb-0 h4 font-weight-bold">NT{{  cartTotal-(Math.floor(cartTotal*(100-couponPercent)/100)) | money }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5">
          <div class="row justify-content-center">
        <div class="col-md-6">
            <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="submitForm" class="text-left">
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                            <div class=" mb-3 ">
                                <label for="name">收件人姓名</label>
                                <input id="name" type="text" class="form-control"
                                    v-model="form.name" :class="classes" name="姓名">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                                <span v-if="passed" class="text-success"><small>OK</small></span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required|email" v-slot="{ errors, classes, passed }">
                            <div class=" mb-3">
                                <label for="email">Email</label>
                                <input id="email" type="email" class="form-control" :class="classes"
                                    v-model="form.email" name="電子信箱">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                                <span v-if="passed" class="text-success"><small>OK</small></span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required|min:8" v-slot="{ errors, classes, passed }">
                            <div class="mb-3">
                                <label for="tel">電話</label>
                                <input id="tel" type="tel" class="form-control" v-model="form.tel" :class="classes"
                                    name="電話">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                                <span v-if="passed" class="text-success"><small>OK</small></span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class="mb-3">
                                <label for="address">地址</label>
                                <input type="text" class="form-control" id="address" :class="classes"
                                    v-model="form.address" name="地址">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class=" mb-3">
                                <label for="payment">購買方式</label>
                                <select class="form-control" id="payment" :class="classes" v-model="form.payment" name="付款方式">
                                    <option value="" disabled>
                                        請選擇付款方式
                                    </option>
                                    <option value="WebATM">
                                        WebATM
                                    </option>
                                    <option value="ATM">
                                        ATM
                                    </option>
                                    <option value="CVS">
                                        CVS
                                    </option>
                                    <option value="Barcode">
                                        Barcode
                                    </option>
                                    <option value="Credit">
                                        Credit
                                    </option>
                                    <option value="ApplePay">
                                        ApplePay
                                    </option>
                                    <option value="GooglePay">
                                        GooglePay
                                    </option>
                                </select>
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class=" mb-3">
                                <label for="message">留言</label>
                                <textarea class="form-control" id="message" :class="classes" placeholder="請輸入留言..."
                                    v-model="form.message"></textarea>
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="text-right">
                        <button type="submit" class="btn btn-dark" :disabled="invalid" >
                            送出表單
                        </button>
                    </div>
                </form>
            </validation-observer>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="position-relative" style="height:300px">
      <div class="position-absolute" style="top:0; bottom:0; left:0; right:0;
      background-image: url(https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=30);
      background-position: center center; opacity: 0.3;"></div>
      <div class="container d-flex flex-column position-absolute" style="left: 50%; transform: translate(-50%, -40%); top: 50%;">
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center">
            <i class="fas fa-shopping-cart fa-7x"></i>
            <h1 class="h3 my-3">您的購物車沒有商品</h1>
            <button class="btn btn-outline-dark mb-5" @click="goShopping()">
              去購物
            </button>
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
      coupon: {},
      coupon_code: '',
      couponPercent: '',
      status: {
        loadingItem: ''
      },
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        coupon: '',
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    quantityUpdate (num, id) {
      if (num <= 0) return
      {
        this.isLoading = true
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
        const cart = {
          product: id,
          quantity: num
        }
        this.$http.patch(url, cart).then(res => {
          this.$store.dispatch('getCart')
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
          this.$bus.$emit('message:push', '更改數量失敗', 'danger')
        })
      }
    },
    removeCartItem (id) {
      this.isLoading = true
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.$http.delete(url).then(res => {
        this.$store.dispatch('getCart')
        this.isLoading = false
        this.$bus.$emit('message:push', '刪除成功', 'success')
      }).catch(() => {
        this.$bus.$emit('message:push', '產品刪除失敗', 'danger')
        this.isLoading = false
      })
    },
    searchCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`
      this.$http.post(url, { code: this.coupon_code }).then(res => {
        this.coupon = res.data.data
        this.couponPercent = res.data.data.percent
        this.$bus.$emit('message:push', '已使用優惠券', 'success')
        this.isLoading = false
      }).catch(() => {
        this.$bus.$emit('message:push', '沒有此優惠券', 'danger')
        this.isLoading = false
      })
    },
    submitForm () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`
      const order = this.form
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code
      }
      this.$http.post(url, order).then(res => {
        if (res.data.data.id) {
          this.$router.push('/orders')
        }
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '訂單送出失敗', 'danger')
      })
    },
    goShopping () {
      this.$router.push('/products')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    cartTotal () {
      return this.$store.state.cartTotal
    }
  },
  created () {
    this.getCart()
    console.log(this.cart)
  }
}
</script>
