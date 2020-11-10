<template>
  <div>
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div  v-for="i in 5" :key="i + 'img'" class="form-group">
                            <label :for="'img' + i">輸入圖片網址</label>
                            <input :id="'img' + i" type="text" class="form-control pl-2"   placeholder="請輸入圖片連結"
                                v-model="tempProduct.imageUrl[i - 1]">
                        </div>
                        <div class="form-group">
                            <label for="customFile">
                                 或 上傳圖片
                            <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                            </label>
                            <input class="form-control"
                                 id="customFile"
                                 ref="file"
                                 type="file"
                                 @change="uploadFile">
                        </div>
                            <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt>
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control" id="title" placeholder="請輸入標題"
                                v-model="tempProduct.title">
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                                    v-model="tempProduct.category">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="unit">單位</label>
                                <input type="unit" class="form-control" id="unit" placeholder="請輸入單位"
                                    v-model="tempProduct.unit">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="origin_price">原價</label>
                                <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                                    v-model="tempProduct.origin_price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">售價</label>
                                <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                                    v-model="tempProduct.price">
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea type="text" class="form-control" id="description" rows="3"
                                placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea type="text" class="form-control" id="content" rows="5" placeholder="請輸入說明內容"
                                v-model="tempProduct.content"></textarea>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input id="is_enabled" class="form-check-input" type="checkbox"
                                    v-model="tempProduct.enabled" :true="1" :false="0">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tempProduct', 'isNew', 'status'],
  data () {
    return {

    }
  },
  methods: {
    updateProduct () {
      if (this.isNew === 'edit') {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
        this.$http.patch(url, this.tempProduct).then(() => {
          this.$emit('update')
          this.$bus.$emit('message:push', '更新資訊成功', 'success')
        }).catch(() => {
          this.$bus.$emit('message:push', '更新資訊失敗', 'danger')
        })
      } else if (this.isNew === 'new') {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`
        this.$http.post(url, this.tempProduct).then(() => {
          this.$emit('update')
          this.$bus.$emit('message:push', '新增成功', 'success')
        }).catch(() => {
          this.$bus.$emit('message:push', '新增失敗', 'danger')
        })
      }
    },
    uploadFile () {
      const uploadedfile = document.querySelector('#customFile').files[0]
      const formData = new FormData()
      formData.append('file', uploadedfile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.tempProduct.imageUrl.push(res.data.data.path)
        }
      }).catch(() => {
        this.status.fileUploading = false
        this.$bus.$emit('message:push', '上傳不可超過 2 MB', 'danger')
      })
    }
  }
}
</script>
