<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 300px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=30); background-position: center center; opacity: 0.1;"></div>
      <h2 class="font-weight-bold">開始彈吉他吧!</h2>
    </div>
    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <div class="col-md-4">
          <div class="accordion border border-bottom border-top-0 border-left-0 border-right-0 mb-3" id="accordionExample">
            <div class="card border-0" v-for="item in categories" :key="item.id">
              <div class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-left-0 border-right-0" id="headingOne" data-toggle="collapse" data-target="#collapseOne">
                <div class="d-flex justify-content-between align-items-center">
                  <button class="btn rounded-0  w-100 py-3" @click="chooseCategory(item)">
                    <h4 class="mb-0 font-weight-bold">
                    {{item}}
                    </h4>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="row" v-if="products">
            <div class="col-md-6"  v-for="item in products" :key="item.id">
              <div class="card border-0 mb-4 position-relative position-relative">
                <a href="#" class=" text-dark" @click.prevent="goPage(item)"><div style="height: 150px; background-size: cover; background-position: center; text-indent:101%; overflow:hidden; white-space:nowrap"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">{{item.title}}
                </div></a>
                <a href="#" class="text-danger">
                  <i class="far fa-heart position-absolute" style="right: 16px; bottom: 60px" @click.prevent="addToFavorite(item.id)"></i>
                </a>
                <div class="card-body p-0">
                  <h4 class="mb-0 mt-3"><a href="#" class=" text-dark" @click.prevent="goPage(item)">{{item.title}}</a></h4>
                  <p class="card-text mb-0">  原價 <del class="text-muted ">{{item.origin_price | money}}</del> <span> 售價 {{item.price | money}} </span></p>
                  <p class="text-muted mt-3"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// /* global $ */

export default {
  data () {
    return {
      isLoading: false,
      products: [],
      categories: [],
      totalPages: []
    }
  },
  methods: {
    getProducts (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${num}`
      this.$http.get(url).then(res => {
        this.products = res.data.data
        this.isLoading = false
      }).catch((error) => {
        if (error.response.request.status === 404) {
          this.$bus.$emit('message:push', `${error.response.request.status} 找不到頁面`, 'danger')
        } else {
          this.$bus.$emit('message:push', `${error.response.request.status}${error.response.data.message}`, 'danger')
        }
      })
    },
    getCategory () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`
      const allCategory = []
      this.$http.get(url).then(res => {
        for (let i = 0; i < res.data.meta.pagination.total_pages; i++) {
          this.totalPages[i] = i + 1
        }
        this.totalPages.forEach(item => {
          this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${item}`).then(res => {
            (res.data.data).forEach(item => {
              allCategory.push(item.category)
            })
            const result = new Set()
            const repeat = new Set()
            allCategory.forEach(item => {
              result.has(item) ? repeat.add(item) : result.add(item)
            })
            this.categories = result
            this.isLoading = false
          }).catch((error) => {
            this.isLoading = false
            if (error.response.request.status === 404) {
              this.$bus.$emit('message:push', `${error.response.request.status} 無法顯示產品分類`, 'danger')
            } else {
              this.$bus.$emit('message:push', `${error.response.request.status} 無法顯示產品分類`, 'danger')
            }
          })
        })
      }).catch((error) => {
        this.isLoading = false
        if (error.response.request.status === 404) {
          this.$bus.$emit('message:push', `${error.response.request.status} 無法顯示產品分類`, 'danger')
        } else {
          this.$bus.$emit('message:push', `${error.response.request.status} 無法顯示產品分類`, 'danger')
        }
      })
    },
    chooseCategory (categoryName) {
      this.isLoading = true
      this.products = []
      this.totalPages.forEach(item => {
        this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${item}`).then(res => {
          res.data.data.forEach(item => {
            if (item.category === categoryName) {
              this.products.push(item)
            }
          })
          this.isLoading = false
        }).catch((error) => {
          if (error.response.request.status === 404) {
            this.$bus.$emit('message:push', `${error.response.request.status} 找不到頁面`, 'danger')
          } else {
            this.$bus.$emit('message:push', `${error.response.request.status} 找不到頁面`, 'danger')
          }
          this.isLoading = false
        })
      })
    },
    addToFavorite (id) {
      console.log(id)
      this.isLoading = true
      const A = this.favorite.find((item) => {
        return item === id
      })
      console.log(A)
      if (A === undefined) {
        this.$store.dispatch('addToFavorite', id)
        this.$bus.$emit('message:push', '加入我的最愛!!', 'success')
      } else {
        this.$bus.$emit('message:push', '此商品已加入我的最愛', 'danger')
      }
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    goPage (item) {
      this.$router.push(`/detail/${item.id}`)
    }
  },
  computed: {
    favorite () {
      return this.$store.state.favorite
    }
  },
  created () {
    this.getProducts()
    this.getCategory()
  }
}
</script>
