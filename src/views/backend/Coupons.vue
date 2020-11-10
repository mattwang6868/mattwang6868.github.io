<template>
  <div>
    <div class="container">
      <loading :active.sync="isLoading"></loading>
      <div class="text-right mt-4">
          <button class="btn btn-primary" @click="openCouponModal('new')">
              建立新的優惠券
          </button>
      </div>
      <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">
                    名稱
                </th>
                <th width="120">
                    折扣碼
                </th>
                <th>
                  折扣
                </th>
                <th width="120">
                    到期日
                </th>
                <th>
                    是否啟用
                </th>
                <th width="180">
                    編輯
                </th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in coupons" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.code }}</td>
              <td>打{{ item.percent/10 }}折</td>
              <td>{{ item.deadline.datetime }}</td>
              <td>
                  <span v-if="item.enabled" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
              </td>
              <td>
                  <div class="btn-group">
                      <button class="btn btn-outline-primary btn-sm" @click="openCouponModal('edit', item)" :disabled = "loadingBtn == item.id">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if = "loadingBtn == item.id"></span>
                          編輯
                      </button>
                      <button class="btn btn-outline-danger btn-sm" @click="openCouponModal('delete', item)" :disabled = "loadingBtn == item.id">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if = "loadingBtn == item.id"></span>
                          刪除
                      </button>
                  </div>
              </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages = "pagination" @update = "getCoupons"></Pagination>
      <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <CouponsModal :temp-coupon ="tempCoupon"  :is-new = "adjustment"  @update = 'getCoupons'></CouponsModal>
      </div>
      <div id="delCouponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <DeleteCouponsModal :del-coupon ="tempCoupon"  @update = 'getCoupons'></DeleteCouponsModal>
        </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import CouponsModal from '@/components/backend/CouponsModal.vue'
import DeleteCouponsModal from '@/components/backend/DeleteCouponsModal.vue'
import jQuery from 'jquery'
const $ = jQuery

export default {
  data () {
    return {
      isLoading: false,
      coupons: [],
      pagination: {},
      tempCoupon: {},
      adjustment: '',
      loadingBtn: ''
    }
  },
  components: {
    Pagination,
    CouponsModal,
    DeleteCouponsModal
  },
  methods: {
    openCouponModal (adjustment, item) {
      switch (adjustment) {
        case 'new':
          this.adjustment = 'new'
          this.tempCoupon = {
          }
          $('#couponModal').modal('show')
          break
        case 'edit':
          this.adjustment = 'edit'
          this.loadingBtn = item.id
          this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`).then(res => {
            this.tempCoupon = res.data.data
            $('#couponModal').modal('show')
            this.loadingBtn = ''
          }).catch(() => {
            this.$bus.$emit('message:push', '無法開啟Modal', 'danger')
          })
          break
        case 'delete':
          this.loadingBtn = item.id
          this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`).then(res => {
            this.tempCoupon = res.data.data
            $('#delCouponModal').modal('show')
            this.loadingBtn = ''
          }).catch(() => {
            this.$bus.$emit('message:push', '無法開啟Modal', 'danger')
          })
          break
        default:
          break
      }
    },
    getCoupons (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${num}`
      this.$http.get(url).then(res => {
        console.log(res)
        this.coupons = res.data.data
        this.pagination = res.data.meta.pagination
        if (this.tempCoupon.id) {
          this.tempCoupon = {}
          $('#couponModal').modal('hide')
          $('#delCouponModal').modal('hide')
          this.isLoading = false
        } else {
          this.tempCoupon = {}
          $('#couponModal').modal('hide')
          this.isLoading = false
        }
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '無法取得優惠卷列表', 'danger')
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
