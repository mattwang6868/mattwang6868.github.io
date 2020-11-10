<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div v-if="!favoriteList.length">
      <div class="position-relative" style="height:300px">
      <div class="position-absolute" style="top:0; bottom:0; left:0; right:0;
      background-image: url(https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=30);
      background-position: center center; opacity: 0.3;"></div>
      <div class="container d-flex flex-column position-absolute" style="left: 50%; transform: translate(-50%, -40%); top: 50%;">
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center">
            <i class="fas fa-shopping-cart fa-7x"></i>
            <h1 class="h3 my-3">沒有收藏的商品</h1>
            <button class="btn btn-outline-dark mb-5" @click="goShopping()">
              去購物
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="container" v-else>
      <h2 class="font-weight-bold mt-3">我的最愛</h2>
      <div class=" row mt-md-5 mt-3 mb-7">
        <div class="col-md-6"  v-for="item in favoriteList" :key="item.id">
          <div class="card border-0 mb-4 position-relative position-relative" >
            <a href="#" class=" text-dark" @click.prevent="goPage(item.id)"><div style="height: 200px; background-size: cover; background-position: center; text-indent:101%; overflow:hidden; white-space:nowrap"
                :style="{backgroundImage: `url(${item.imageUrl})`}">{{item.title}}
            </div></a>
            <a href="#" class="text-danger">
              <i class="fas fa-times position-absolute border border-danger p-1 " style="right: 1px; bottom: 50px" @click.prevent="deleteFavorite(item.id)">刪除</i>
            </a>
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3"><a href="#" class=" text-dark" @click.prevent="goPage(item.id)">{{item.title}}</a></h4>
              <p class="card-text mb-0">  原價 <del class="text-muted ">{{item.origin_price | money}}</del> <span> 售價 {{item.price | money}} </span></p>
              <p class="text-muted mt-3"></p>
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
      products: []
    }
  },
  methods: {
    getProducts (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${num}`
      this.$http.get(url).then(res => {
        this.products = res.data.data
        this.isLoading = false
        this.getFavoriteList()
      }).catch((error) => {
        if (error.response.request.status === 404) {
          this.$bus.$emit('message:push', `${error.response.request.status} 找不到頁面`, 'danger')
        } else {
          this.$bus.$emit('message:push', `${error.response.request.status}${error.response.data.message}`, 'danger')
        }
      })
    },
    getFavoriteList () {
      this.$store.dispatch('getFavoriteList', this.products)
    },
    deleteFavorite (id) {
      this.isLoading = true
      this.$store.dispatch('deleteFavorite', id)
      this.getProducts()
    },
    goShopping () {
      this.$router.push('/products')
    },
    goPage (id) {
      console.log(id)
      this.$router.push(`/detail/${id}`)
    }
  },
  computed: {
    favorite () {
      return this.$store.state.favorite
    },
    favoriteList () {
      return this.$store.state.favoriteList
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
