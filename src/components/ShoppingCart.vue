<template>
    <div class="cart">
        <h2>Shopping Cart</h2>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>
        <ul>
            <li v-for="cart in products" :key="cart.id">
                <input type="checkbox" :value="cart.id" v-model="checklist">
                {{ cart.id }} - {{ cart.title }} - {{ cart.price | currency }} - {{ cart.quantity }}
                <button @click="removeFromCart(cart.id)">remove</button>
                <br>
            </li>
        </ul>
        <p><input type="checkbox" @click="selectAll" :checked="checklist.length === products.length"> Total: {{ total | currency }}</p>
        <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
        <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
        <p v-show="status">组件内部状态： {{ status }}</p>
        <button @click="changeStatus">changeStatus</button>
    </div>
</template>

<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ShoppingCart',
  data () {
    return {
      status: true,
      checklist: []
    }
  },
  computed: {
    ...mapState({
      checkoutStatus: (state) => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
  methods: {
    ...mapActions('cart', [
      'removeCart'
    ]),
    changeStatus () {
      this.status = !this.status
    },
    checkout (products) {
      const checklist = this.checklist
      products = products.filter(product => checklist.includes(product.id))
      this.$store.dispatch('cart/checkout', products)
    },
    selectAll () {
      if (this.products.length === this.checklist.length) {
        this.checklist = []
      } else {
        this.checklist = this.products.map(product => product.id)
      }
    },
    removeFromCart (id) {
      const me = this
      this.$confirm('确定从购物车中删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.removeCart(id)
      }).catch(() => { })
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
