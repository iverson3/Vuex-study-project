import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('@/components/Login')), 'auth-group')

const SearchList = r => require.ensure([], () => r(require('@/components/SearchList')), 'search-group')
const Cont1 = r => require.ensure([], () => r(require('@/components/Content/Cont1')), 'search-group')
const Cont2 = r => require.ensure([], () => r(require('@/components/Content/Cont2')), 'search-group')
const GoodsDetail = r => require.ensure([], () => r(require('@/components/Content/GoodsDetail')), 'search-group')

const Index = r => require.ensure([], () => r(require('@/components/Index')), 'index-group')
const ProductList = r => require.ensure([], () => r(require('@/components/ProductList')), 'shop-group')
const ShoppingCart = r => require.ensure([], () => r(require('@/components/ShoppingCart')), 'shop-group')
const ProductDetail = r => require.ensure([], () => r(require('@/components/ProductDetail')), 'shop-group')

const TabContainer = r => require.ensure([], () => r(require('@/components/Tabs/TabContainer')), 'tabs-group')
const TabOne = r => require.ensure([], () => r(require('@/components/Tabs/TabOne')), 'tabs-group')
const TabTwo = r => require.ensure([], () => r(require('@/components/Tabs/TabTwo')), 'tabs-group')

const NotFound = r => require.ensure([], () => r(require('@/components/NotFound')), 'notfound-group')

const routes = [
  {
    path: '/',
    alias: '/index', // 设置path别名
    // redirect: '/login',
    // redirect: { name: 'Login' },
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search',
    name: 'SearchList',
    component: SearchList,
    children: [
      {
        path: 'c1',
        name: 'Cont1',
        component: Cont1,
        meta: { scrollToTop: true }
      },
      {
        path: 'c2',
        name: 'Cont2',
        component: Cont2,
        meta: { scrollToTop: true }
      },
      {
        path: 'one',
        name: 'TabOne',
        component: TabOne,
        meta: { scrollToTop: true }
      },
      {
        path: 'two',
        name: 'TabTwo',
        component: TabTwo,
        meta: { scrollToTop: true }
      }
    ]
  },
  {
    path: '/goods/detail/:id',
    name: 'GoodsDetail',
    props: true,
    component: GoodsDetail
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    props: true,
    component: ProductDetail
  },
  {
    path: '/cart/list',
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: { requiresAuth: true },
    // 路由独享的守卫
    beforeEnter: (to, from, next) => {
      // 相关逻辑
      next()
    }
  },
  {
    path: '/tabs',
    component: TabContainer,
    children: [
      {
        path: '',
        name: 'TabOne',
        component: TabOne,
        meta: { scrollToTop: true } // 设置需要滚到顶部
      },
      {
        path: 'two',
        name: 'TabTwo',
        component: TabTwo,
        meta: { scrollToTop: false } // 设置不需要滚到顶部
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

// 自定义在路由切换时页面如何滚动 (控制滚动条滚动行为)
// savedPosition 参数只有通过点击"浏览器的【前进/后退】按钮触发"时才可用
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      // 模拟“滚动到锚点”的行为
      return {
        selector: to.hash
      }
    }
    // 匹配路由的meta字段是否包含scrollToTop信息
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // 让页面滚动到顶部
      position.x = 0
      position.y = 0
    }
    // 如果返回的是空对象，则保持当前的滚动位置
    return position
  }
}

// 实例化VueRouter 并设置相关参数
const router = new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes
})

export default router
