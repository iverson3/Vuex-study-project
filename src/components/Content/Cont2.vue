<template>
    <div>
        <div v-loading="isLoading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             class="goods-list-con">
            <div v-for="goods in goodslist" class="goods-list-item" :key="goods.id">
                <router-link :to="{ name: 'GoodsDetail', params: {id: goods.id}}">
                    <div class="goods-list-item-div">
                        <div class="goods-list-item-left"><img :src="goods.url"/></div>
                        <div class="goods-list-item-right">
                            <p class="goods-list-item-title">{{ goods.name }}</p>
                            <p>
                                <el-rate
                                        id="goods-list-item-rate"
                                        v-model="tmp_rate"
                                        :max="5"
                                        disabled
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                </el-rate>
                                <span>销量: {{ goods.sold_num }}</span>
                            </p>
                            <p>价格: {{ goods.price }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <el-button v-show="isShow" @click="loadMore()" class="loadmore" :loading="isLoading" size="small">{{ loadingText }}</el-button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Cont2',
  data () {
    return {
      tmp_rate: 4.5
    }
  },
  computed: {
    ...mapState({
      goodslist: (state) => state.products.testGoodsList,
      isShow: (state) => state.products.isShowLoadMore,
      isLoading: (state) => state.products.isLoading
    }),
    loadingText () {
      return this.isLoading ? '加载中...' : '加载更多'
    }
  },
  methods: {
    ...mapActions('products', [
      'getGoodsList',
      'initData'
    ]),
    loadMore () {
      this.getGoodsList()
    }
  },
  created () {
    this.initData()
    this.getGoodsList()
  }
}
</script>

<style scoped>
    .goods-list-con {
        text-align: left;
    }
    .goods-list-item {
        padding-bottom: 80px;
        display: block;
    }
    .goods-list-item img {
        width: 62px;
        margin-right: 8px;
    }
    .goods-list-item-div {
        display: block;
        clear: both;
    }
    .goods-list-item-title {
        font-size: 15px!important;
        color: #606266!important;
        font-weight: bold;
        width: 170px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .goods-list-item-left {
        float: left;
    }
    .goods-list-item-right {
        float: left;
    }
    .goods-list-item-right p {
        font-size: 11px;
        line-height: 16px;
        color: gray;
        padding: 0px;
        margin: 0px;
        margin-top: 4px;
    }
    .loadmore {
        margin-top: 5px;
    }
    #goods-list-item-rate {
        display: inline;
    }
    #goods-list-item-rate span {
        width: 19px;
        height: 19px;
    }
    #goods-list-item-rate i {
        font-size: 12px;
    }
    .el-rate__icon {
        font-size: 12px!important;
    }
</style>
