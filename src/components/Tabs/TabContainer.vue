<template>
    <div>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active">
                <router-view></router-view>
            </div>
        </div>
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active">
                <router-link :to="{ name: 'TabOne'}">Tab1</router-link>
            </li>
            <li role="presentation">
                <router-link :to="{ name: 'TabTwo'}">Tab2</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'TabContainer',
  watch: {
    // 如果路由有变化，执行指定的方法
    // $route: 'watchRouterChange'

    // 监听路由的另一方式
    $route (to, from) {
      console.log(from)
      console.log(to)
      console.log(this.$route)
      console.log(this.$route.query)
      if (from.query !== to.query) {
        console.log('param change')
      }
    }
  },
  created () {
    // this.$store.dispatch('products/getAllProducts')

    // console.log(this.$store.state)
    console.log(this.$store.state.route)
  },
  methods: {
    watchRouterChange () {
      console.log('router change from TabContainer.vue')
      console.log(this.$router)
      console.log(this.$store.state.route)
      console.log(this.$store.state.route.path)
      console.log(this.$store.state.route.params)
      console.log(this.$store.state.route.query)
    }
  },

  // 组件内的三个路由守卫
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 `this`  因为当守卫执行前，组件实例还没被创建
    // 解决方法： 传一个回调函数给 next来访问组件实例 (在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数)
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      // 取消导航 留在当前页面
      next(false)
    }
  }
}
</script>

<style scoped>

</style>
