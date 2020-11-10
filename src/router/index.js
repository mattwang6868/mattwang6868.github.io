import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('../views/frontend/HomePage.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/frontend/Products.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/frontend/Cart.vue')
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('../views/frontend/Detail.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/frontend/Orders.vue')
      },
      {
        path: 'payorder/:id',
        name: 'PayOrder',
        component: () => import('../views/frontend/PayOrder.vue')
      },
      {
        path: 'checkoutsuccess/:id',
        name: 'CheckOutSuccess',
        component: () => import('../views/frontend/CheckOutSuccess.vue')
      },
      {
        path: 'recording',
        name: 'Recording',
        component: () => import('../views/frontend/RecordingPage.vue')
      },
      {
        path: 'lesson',
        name: 'Lesson',
        component: () => import('../views/frontend/LessonPage.vue')
      },
      {
        path: 'favorite',
        name: 'Favorite',
        component: () => import('../views/frontend/Favorite.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '後台產品列表',
        component: () => import('../views/backend/Products.vue')
      },
      {
        path: 'coupons',
        name: '優惠卷列表',
        component: () => import('../views/backend/Coupons.vue')
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'order/:id',
        name: '訂單詳情',
        component: () => import('../views/backend/OrderDetail.vue')
      },
      {
        path: 'customer_orders',
        name: '模擬下單系統',
        component: () => import('../views/backend/CustomerOrders.vue')
      },
      {
        path: 'customer_checkout',
        name: '用戶訂單列表',
        component: () => import('../views/backend/CustomerCheckOut.vue')
      },
      {
        path: 'customer_payorder/:id',
        name: '用戶訂單結帳',
        component: () => import('../views/backend/CustomerPayOrder.vue')
      },
      {
        path: 'storages',
        name: '圖片列表',
        component: () => import('../views/backend/Storages.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
