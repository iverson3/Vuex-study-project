<template>
    <div>
        <h3>Product Detail {{ id }}</h3>

        <img src="http://www.qbiao.cn/upload/images/20151814455.jpg" alt="" v-transclude>

        <div class="one" v-drag>拖拽one</div>
        <div class="two" v-drag>拖拽two</div>

        <div class="div1"></div>
    </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: ['id'],
  created () {
    // 直接从路由中获取参数
    let id = this.$route.params.id
  },
  methods: {
  }
}
</script>

<style scoped>
    .one,.two{
        height:100px;
        width:100px;
        border:1px solid #000;
        position: absolute;
        -webkit-user-select: none;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        cursor: pointer;
    }
    .two{
        left:200px;
    }
    .div1 {
        width: 100%;
        height: 200px;
        border: 1px solid blue;
    }
</style>
