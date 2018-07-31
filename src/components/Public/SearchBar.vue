<template>
    <div>
        <div class="title-container">
            <i class="el-icon-back" @click="goBack()"></i>
            <span>美食中心</span>
            <i class="el-icon-search el-icon--right search-icon"></i>
        </div>

        <el-dropdown>
            <span class="el-dropdown-link" @click="masklayer = !masklayer">商家分类<i class="el-icon-arrow-down el-icon--right"></i></span>
        </el-dropdown>

        <el-dropdown trigger="click" @command="sortChange">
            <span class="el-dropdown-link">{{ this.curOrderName }}<i class="el-icon-sort el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="created_at">时间</el-dropdown-item>
                <el-dropdown-item command="sold_num">销售量</el-dropdown-item>
                <el-dropdown-item command="price">价格</el-dropdown-item>
                <el-dropdown-item command="rate">评分</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
            <span class="el-dropdown-link">条件筛选<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >评分</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div v-show="masklayer" class="mask-layer"></div>
        <div class="transition-div">
            <el-collapse-transition>
                <div v-show="masklayer">
                    <div class="transition-box">el-collapse-transition</div>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'SearchBar',
  data () {
    return {
      masklayer: false
    }
  },
  computed: {
    ...mapGetters('products', [
      'curOrderName'
    ])
  },
  methods: {
    ...mapActions('products', [
      'getGoodsList'
    ]),
    ...mapMutations('products', [
      'setOrderby'
    ]),
    sortChange (command) {
      // 相当于 this.$store.commit('products/setOrderby')
      this.setOrderby(command)
      this.getGoodsList()
    },
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: white;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .el-dropdown-link {
        margin-right: 36px;
    }
    .search-icon {
        float: right!important;
        margin-right: 18px;
        margin-top: 11px!important;
    }
    .title-container {
        clear: both;
        width: 100%;
        height: 38px;
        background-color: white;
    }
    .title-container i {
        float: left;
        margin-left: 16px;
        margin-top: 12px;
    }
    .title-container span {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
        display: inline-block;
        padding-top: 3px;
    }

    .transition-div {
        margin-top: 0px;
        height: auto;
    }
    .transition-box {
        margin-bottom: 10px;
        width: 100%;
        height: 200px;
        background-color: white;
        color: #fff;
        box-sizing: border-box;
        z-index: 1;
        position: relative;
    }
    .mask-layer {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        outline: 0;
        -webkit-overflow-scrolling: touch;
        background-color: rgb(0, 0, 0);
        filter: alpha(opacity=80);
        background-color: rgba(0, 0, 0, 0.8);
    }
</style>
