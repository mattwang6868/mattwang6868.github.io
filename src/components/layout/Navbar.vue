<template>
  <div>
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light bg-dark">
        <button class="navbar-toggler d-lg-none " type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon text-white" style="filter:invert(100%);"></span>
        </button>
        <a class="navbar-brand position-absolute text-white d-none d-lg-inline-block" href="./"
          style="left: 50%; transform: translate(-50%, -50%); top: 50%;">
          827 Music Studio
        </a>
        <a class="navbar-brand text-white d-lg-none d-inline-block" href="./"
          style="">
          827 Music Studio
        </a>
        <div class="d-flex order-lg-1">
          <router-link class="nav-link text-white" to="/cart"><i class="fas fa-shopping-cart position-absolute"></i><span class="badge badge-pill badge-info position-relative" style="top:-12px;right:-15px;">{{cartlength}}</span></router-link>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-white " to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white " to="/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white " to="/orders">我的訂單</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white ml-2 ml-lg-0" to="/favorite">我的最愛<span class="badge badge-pill badge-info position-relative" style="top:-3px;">{{favorite.length}}</span></router-link>
            </li>
          </ul>
        </div>
        </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  computed: {
    ...mapGetters(['cart', 'cartlength', 'favorite'])
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>
