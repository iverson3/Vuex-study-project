<template>
    <el-container style="height: 600px; border: 1px solid #eee">
        <el-header style="height: 72px; padding-left: 0px; padding-right: 0px;">
            <SearchBar></SearchBar>
        </el-header>
        <el-container>
            <el-aside width="75px" style="background-color: #F2F6FC">
                <Nav></Nav>
            </el-aside>

            <el-container>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>

        <el-container>
            <el-footer style="background-color: aquamarine;">
                <Footer></Footer>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import Nav from './Public/Nav'
import Footer from './Public/Footer'
import ToolBar from './Public/ToolBar'
import SearchBar from './Public/SearchBar'
export default {
  name: 'SearchList',
  components: { Nav, ToolBar, SearchBar, Footer }
}
</script>

<style scoped>
    .el-header {
        background-color: #409EFF;
        color: #333;
        line-height: 33px;
    }
    .el-aside {
        color: #333;
    }
</style>
