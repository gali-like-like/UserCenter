<script setup>
import {Avatar, Lock, Key} from "@element-plus/icons-vue";
import request from "@/utils/request.js";
import { reactive, ref } from "vue";
import router from "@/router/index.js";
import messageDialog from "@/utils/messageDialog.js";
import {userStore} from "@/store/useUserStore.js";
import {storeToRefs} from "pinia";

const user = userStore()
const { accountInfo, userLoginInfo } = storeToRefs(user);
const userRegedit = () => {
  // 发送注册请求
  request.post("/api/user/regedit",accountInfo.value);
}
const url = ref(null);
const getCode = () => {
  request.post("/api/user/code").then(res => {
    url.value = res.data;
  })
}
getCode();
const onClickLogin = () => {
  router.push("/login")
}
</script>

<template>
    <div class="contentArea" id="main">
      <div class="headerArea">
        <el-text size="large" id="headerText">注册</el-text>
      </div>
      <div class="containerArea">
        <el-form :model="accountInfo" class="loginArea">
          <el-input v-model="accountInfo.userAccount" placeholder="请输入昵称" clearable  :prefix-icon="Avatar" size="large"/>
          <el-input v-model="accountInfo.userPassword" placeholder="请输入密码" clearable :prefix-icon="Lock" size="large" show-password/>
          <div class="middleArea">
            <el-input v-model="accountInfo.code" clearable placeholder="请输入计算结果" size="large" :prefix-icon="Key"></el-input>
            <el-image :src="url" @click="getCode"></el-image>
          </div>
          <el-form-item>
            <el-button type="primary" @click="userRegedit" size="large" id="regeditBtn">注册</el-button>
          </el-form-item>
        </el-form>
        <el-text class="noAccountText" size="large">已注册</el-text>
        <el-text class="noAccountText hoverColor" size="large" @click="onClickLogin">我要登录</el-text>
      </div>
    </div>
</template>

<style scoped>

.hoverColor {
  color: #535bf2;
  margin-bottom: 20px;
}

.hoverColor:hover {
  text-decoration: underline solid #90d3d3;
}

.contentArea#main {
  background-color: #9292a1;
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.headerArea#main {
  height: 80px;
  line-height: 80px;
}

.headerArea>.el-text {
  font-size: 30px;
  font-weight: bold;
}
.middleArea {
  display: flex;
  justify-content: space-between;
}
.containerArea {
  text-align: left;
  width: 400px;
}
.el-form>.el-input,.el-form>div,.el-form>.el-button {
  margin-bottom: 10px;
  font-size: 25px;
}
.el-form .el-input {
  font-size: 25px;
}
#regeditBtn {
  width: 100%;
}
</style>
