<template>
  <div>
    <div class="modal-dialog modal-l">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group text-left">
                            <label for="title">名稱</label>
                            <input type="text" class="form-control" id="title" placeholder="請輸入標題"
                                v-model="tempCoupon.title">
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6 text-left">
                                <label for="code">序號</label>
                                <input type="text" class="form-control" id="code" placeholder="請輸入序號"
                                    v-model="tempCoupon.code">
                            </div>
                            <div class="form-group col-md-6 text-left">
                                <label for="percent">折扣</label>
                                <input type="number" class="form-control" id="percent" placeholder="請輸入折扣百分比"
                                    v-model="tempCoupon.percent">
                            </div>
                        </div>
                        <div class="form-row">
                          <div class="form-group col-md-6 text-left">
                              <label for="deadline_at">到期日</label>
                              <input type="date" class="form-control" id="deadline_at" placeholder="請輸入到期日"
                                      v-model="duedate">
                          </div>
                          <div class="form-group col-md-6 text-left">
                              <label for="deadline_at">到期時間</label>
                              <input type="time" class="form-control" id="deadline_at" placeholder="請輸入到期日"
                                      v-model="duetime" step="1">
                          </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input id="is_enabled" class="form-check-input" type="checkbox"
                                    v-model="tempCoupon.enabled" :true="1" :false="0">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tempCoupon', 'isNew'],
  data () {
    return {
      duedate: '',
      duetime: ''
    }
  },
  methods: {
    updateCoupon () {
      if (this.isNew === 'edit') {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
        this.$http.patch(url, this.tempCoupon).then(res => {
          this.$emit('update')
          this.$bus.$emit('message:push', '刪除成功', 'success')
        }).catch(() => {
          this.isLoading = false
          this.$bus.$emit('message:push', '刪除失敗', 'danger')
        })
      } else if (this.isNew === 'new') {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`
        this.tempCoupon.deadline_at = `${this.duedate} ${this.duetime}`
        console.log(this.tempCoupon.deadline_at)
        this.$http.post(url, this.tempCoupon).then(res => {
          this.$emit('update')
          this.$bus.$emit('message:push', '新增成功', 'success')
        }).catch(() => {
          this.isLoading = false
          this.$bus.$emit('message:push', '新增失敗', 'danger')
        })
      }
    }
  }
}
</script>
