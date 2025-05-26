<script setup>
import {Avatar, Lock} from "@element-plus/icons-vue";
import {ref,reactive} from 'vue'
import router from '@/router/index.js'
import request from "@/utils/request.js";
import messageDialog from "@/utils/messageDialog.js";
import {userStore} from "@/store/useUserStore.js";
import {storeToRefs} from "pinia";
const isSave = ref(false);

const dialogVisible = ref(0);
const handleClose = () => {
  dialogVisible.value = 0;
}
const user = userStore();
const { accountInfo,userLoginInfo } = storeToRefs(user);
const onClickLogin =  () => {
  // todo 发送登录请求
  console.log("登录信息:"+userLoginInfo.value)
  request.post("/api/user/login",userLoginInfo.value).then(res => {
    debugger;
    console.log(`想要数据:${JSON.stringify(res)}`)
    if (res.code === 200) {
      router.push("/home");
    }
  })
}

const onClickForget = () => {
  // 显示弹窗
  dialogVisible.value = 100;
}

const onClickReset = () => {
  const loginInfo = {
    userAccount: accountInfo.value.userAccount,
    userPassword: accountInfo.value.userPassword
  }
  request.post("/api/user/reset",userLoginInfo)
}

const onClickRegister = () => {
  // todo 跳转注册页面
  console.log("注册")
  router.push("/regedit");
}

</script>

<template>
  <div class="contentArea">
      <div class="headerArea" id="main">
        <el-text size="large" id="headerText">欢迎登录</el-text>
      </div>
      <div class="containerArea">
        <el-form :model="accountInfo" class="loginArea">
          <el-input  v-model="accountInfo.userAccount"
                     placeholder="请输入账号" clearable  :prefix-icon="Avatar" size="large"/>
          <el-input v-model="accountInfo.userPassword"
                    placeholder="请输入密码" clearable :prefix-icon="Lock" size="large" show-password/>
          <div class="middleArea">
            <el-checkbox v-model="isSave" label="记住密码" size="large" />
            <el-text class="hoverColor" size="large" @click="onClickForget">忘记密码?</el-text>
            <el-dialog class="resetDialog"
                       v-model="dialogVisible"
                       title="Tips"
                       width="500"
                       :before-close="handleClose"
            >
              <span class="dialogText">是否重置密码?</span>
              <template #footer>
                <div class="dialogFooter">
                  <el-button @click="dialogVisible = 100">取消</el-button>
                  <el-button type="primary" @click="onClickReset">
                    确认
                  </el-button>
                </div>
              </template>
            </el-dialog>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onClickLogin" size="large">登录</el-button>
          </el-form-item>
        </el-form>
        <el-text class="noAccountText" size="large">没有账号</el-text>
        <el-text class="noAccountText hoverColor" size="large" @click="onClickRegister">立即注册</el-text>
      </div>
    </div>
</template>

<style scoped>

.resetDialog {
  animation: opacity 200ms ease;
}

.dialogFooter {
  display: flex;
}

.dialogText {
  color: #d12c2c;
  font-size: 25px;
}

.contentArea {
  background-color: #9292a1;
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-evenly;
  flex-wrap: wrap;
  box-shadow: 5px 5px 5px #716868;
}

.headerArea {
  height: 80px;
  line-height: 80px;
}

#headerText {
  font-size: 30px;
  font-weight: bold;
}
.containerArea {
  text-align: left;
}
.loginArea {
  width: 400px;
}
.loginArea>.el-input {
  margin-bottom: 10px;
  font-size: 25px;
}
.loginArea .el-button {
  font-size: 25px;
  width: 100%;
}
.middleArea {
  display: flex;
  justify-content: space-between;
}
.container>.el-text:nth-child(3) {
  color: #535bf2;
}

.hoverColor {
  color: #535bf2;
  margin-bottom: 20px;
}

.hoverColor:hover {
  text-decoration: underline solid #90d3d3;
}
</style>
