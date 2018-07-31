<template>
    <div>
        <h3>Login</h3>

        <el-form status-icon label-width="100px" class="demo-ruleForm login-form">
            <el-form-item label="用户名" prop="age">
                <el-input v-model="username" placeholder=""></el-input>
            </el-form-item>
            <el-alert title="用户名不能为空" v-show="usernameError" type="error" class="errTip" :closable="false" show-icon></el-alert>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-alert title="密码不能为空" v-show="passwordError" type="error" class="errTip" :closable="false" show-icon></el-alert>
            <el-form-item>
                <el-button :disabled="isLogining" type="primary" @click="login()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      code: '',
      isLogining: false,
      usernameError: false,
      passwordError: false
    }
  },
  created () {
    // n
  },
  methods: {
    login () {
      if (this.username === '') {
        this.usernameError = true
        return
      }
      this.usernameError = false
      if (this.password === '') {
        this.passwordError = true
        return
      }
      this.passwordError = false
      const payload = {
        username: this.username,
        password: this.password
      }
      this.isLogining = true

      const me = this
      this.$store.dispatch('user/login', payload).then((res) => {
        if (res) {
          me.$message({
            message: '登录成功，即将返回上一页',
            type: 'success',
            duration: 1000,
            onClose: () => {
              me.$router.go(-1)
            }
          })
        } else {
          me.$message.error('登录失败：账号或密码错误')
        }
        this.isLogining = false
      }, () => {
        me.$message.error('登录出现错误，请重试')
        this.isLogining = false
      })
    }
  }
}
</script>

<style scoped>
    .login-form {
        width: 300px;
        text-align: center;
    }
    .errTip {
        margin-left: 99px;
        width: 201px;
        margin-bottom: 10px;
        margin-top: -17px;
    }
</style>
