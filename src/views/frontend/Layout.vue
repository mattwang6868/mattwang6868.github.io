<template>
  <div>
    <Navbar class="bg-dark"></Navbar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
// import { mapGetters } from 'vuex'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
