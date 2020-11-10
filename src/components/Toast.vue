<template>
  <div style="position: fixed; top: 20px; right: 20px; min-width: 300px; z-index: 11000;">
      <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" v-for="(item, i) in messages" :key="i" :id="`toast-${i}`">
        <div class="toast-header">
          <div class="inline-block rounded mr-2" :class="`bg-${ item.status }`" style="width: 20px; height: 20px" ></div>
          <strong class="mr-auto">827</strong>
          <small>現在</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" @click="closeToast(`toast-${i}`)">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      <div class="toast-body">
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>

<script>
import jQuery from 'jquery'
const $ = jQuery

export default {
  name: 'Toasts',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    },
    closeToast (element) {
      $(`#${element}`).toast('hide')
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
  },
  beforeDestroy () {
    const vm = this
    vm.$bus.$off('message:push')
  }
}
</script>
