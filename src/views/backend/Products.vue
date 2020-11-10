<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div id="app" class="container">
        <div class="text-right mt-4">
            <button class="btn btn-primary"  @click="openModal('new')">
                建立新的產品
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">
                        分類
                    </th>
                    <th>產品名稱</th>
                    <th width="120">
                        原價
                    </th>
                    <th width="120">
                        售價
                    </th>
                    <th width="100">
                        是否啟用
                    </th>
                    <th width="120">
                        編輯
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in products" :key="index">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td class="text-right">
                        {{ item.origin_price | money }}
                    </td>
                    <td class="text-right">
                        {{ item.price | money }}
                    </td>
                    <td>
                        <span v-if="item.enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)" :disabled = "loadingBtn == item.id">
                                編輯
                            </button>
                            <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :pages = "pagination" @update = "getProducts"></Pagination>
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Modal :temp-product ="tempProduct"  :is-new = "adjustment" :status = "status" @update = 'getProducts'></Modal>
        </div>
        <div id="delProductModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <DeleteModal :del-product ="tempProduct"  @update = 'getProducts'></DeleteModal>
        </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'
import Modal from '@/components/backend/Modal.vue'
import DeleteModal from '@/components/backend/DeleteModal.vue'

export default {
  components: {
    Pagination,
    Modal,
    DeleteModal
  },
  data () {
    return {
      isLoading: false,
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: []
      },
      adjustment: '',
      loadingBtn: '',
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    openModal (adjustment, item) {
      switch (adjustment) {
        case 'new':
          this.adjustment = 'new'
          this.isLoading = true
          this.tempProduct = {
            imageUrl: []
          }
          $('#productModal').modal('show')
          this.isLoading = false
          break
        case 'edit':
          this.adjustment = 'edit'
          this.isLoading = true
          this.loadingBtn = item.id
          this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`).then(res => {
            this.tempProduct = res.data.data
            $('#productModal').modal('show')
            this.loadingBtn = ''
            this.isLoading = false
          }).catch(() => {
            this.isLoading = false
            this.$bus.$emit('message:push', '無法取得產品資料', 'danger')
          })
          break
        case 'delete':
          this.isLoading = true
          this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`).then(res => {
            this.tempProduct = res.data.data
            $('#delProductModal').modal('show')
            this.isLoading = false
          }).catch(() => {
            this.isLoading = false
            this.$bus.$emit('message:push', '刪除失敗，請再試一次', 'danger')
          })
          break
        default:
          break
      }
    },
    getProducts (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`
      this.$http.get(url).then(res => {
        this.products = res.data.data
        this.pagination = res.data.meta.pagination
        if (this.tempProduct.id) {
          this.tempProduct = {
            imageUrl: []
          }
          $('#productModal').modal('hide')
          $('#delProductModal').modal('hide')
          this.isLoading = false
        } else {
          this.tempProduct = {
            imageUrl: []
          }
          $('#productModal').modal('hide')
          this.isLoading = false
        }
      }).catch(() => {
        this.$bus.$emit('message:push', '取得產品清單失敗', 'danger')
        this.isLoading = false
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
