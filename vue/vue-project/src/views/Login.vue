<template>
  <div class="login-container">
    <el-form :model="form" :ref="formRef">
      <el-form-item>
        <h2 @click="back2Home">欢迎登录</h2>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="login">Login</el-button> -->
        <div class="login-btn" @click="login">
          登录
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
  username: '',
  password: ''
})

const formRef = ref(null)

const login = () => {
  back2Home()
}

const back2Home = () => {


  console.log(router);

  router.push('/')
}

</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, blue, pink);


  .el-form {
    width: 300px;
    height: 300px;
    border: 4px solid transparent;
    border-radius: 16px;
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    /*important*/
    padding: 20px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      margin: -4px;
      border-radius: inherit;
      /*important*/
      background: linear-gradient(to right, #8F41E9, #578AEF);
    }

    .login-btn {
      width: 100%;
      height: 40px;
      cursor: pointer;
      border-radius: 4px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: var(--el-color-primary);
    }
  }
}
</style>
