<template>
    <el-menu class="nav-list" default-active="1">
        <router-link :to="{ name: 'Cont1'}"><el-menu-item index="1">面食</el-menu-item></router-link>
        <router-link :to="{ name: 'Cont2'}"><el-menu-item index="2">水果</el-menu-item></router-link>
        <router-link :to="{ name: 'TabOne'}"><el-menu-item index="3">夜宵</el-menu-item></router-link>
        <router-link :to="{ name: 'TabTwo'}"><el-menu-item index="4">外卖</el-menu-item></router-link>
    </el-menu>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
    .nav-list a {
        text-decoration: none;
    }
</style>
