<template>
    <div>
        <el-carousel trigger="click" height="150px" :autoplay="false" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
                <div class="carousel-container">
                    <div class="carousel-tr">
                        <div>1-1</div>
                        <div>1-2</div>
                        <div>1-3</div>
                        <div>1-4</div>
                        <div>1-5</div>
                    </div>
                    <div class="carousel-tr">
                        <div>2-1</div>
                        <div>2-2</div>
                        <div>2-3</div>
                        <div>2-4</div>
                        <div>2-5</div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>

        <h2>Product List</h2>
        <ul>
            <li v-for="product in products" :key="product.id">
                <router-link :to="{ name: 'ProductDetail', params: {id: product.id}, query: {queryParaId: product.id}}">
                    {{ product.title }} - {{ product.price | currency }}
                </router-link>
                <br>
                <button
                    :disabled="!product.inventory"
                    @click="addProductToCart(product)">
                    Add to cart
                </button>
            </li>
        </ul>
        <div>
            <button @click="getDataTest">getData</button>
            <button v-show="isLogin" @click="logout">Logout</button>
            <router-link :to="{ name: 'ShoppingCart'}">goto shoppingCart</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: mapState({
    products: state => state.products.all,
    isLogin: state => state.user.accessToken === '' ? false : true
  }),
  methods: {
    ...mapActions('cart', [
      'addProductToCart'
    ]),
    getDataTest () {
      this.$store.dispatch('products/getDataTest', {id: 3, order: 'time'})
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  created () {
    this.$store.dispatch('products/getAllProducts')

    // console.log(this.$store.state)
    console.log(this.$store.state.route)
    console.log(this.$store.state.route.path)
    console.log(this.$store.state.route.params)
    console.log(this.$store.state.route.query)
  }
}
</script>

<style scoped>
    .carousel-tr {
        width: 100%;
        height: 73px;
        clear: both;
    }
    .carousel-tr div {
        float: left;
        width: 17%;
        height: 85%;
        margin: 5px;
        background-color: #E4E7ED;
    }
</style>
