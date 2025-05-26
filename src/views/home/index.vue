<script setup>
  import router from "@/router/index.js";
  import {ref, useTemplateRef, reactive} from 'vue'
  import {userInfoStore} from "@/store/useUserInfo.js";

  const activeIndex = ref(1);
  const userInfo = userInfoStore();
  const circleUrl = userInfo.avatarUrl;
  const username = userInfo.username;
  const userInfoShow = ref(false);
  const changeShow = () => {
    userInfoShow.value = !userInfoShow.value;
  }
  const activeLi = reactive({
    color: "#36c578"
  })
  const normalLi = reactive({
    color: "black"
  })
  const systemUrl = ref("");
</script>

<template>
  <div class="layout">
    <div class="aside">
      <ul>
        <li>
          <el-image :src="systemUrl" lazy />
        </li>
        <li>
          <router-link to="/home/users" @click="() => activeIndex = 1" ref="home" :style="activeIndex === 1?activeLi:normalLi">用户首页</router-link>
        </li>
        <li>
          <router-link to="/home/usermanage" @click="() => activeIndex = 2" ref="userManage" :style="activeIndex === 2?activeLi:normalLi">用户管理</router-link>
        </li>
        <li>
          <router-link to="/home/self" @click="() => activeIndex = 3" ref="self" :style="activeIndex === 3?activeLi:normalLi">个人信息</router-link>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="header">
        <el-avatar :size="50" :src="circleUrl" @click="changeShow" />
        <el-text type="primary" size="large" >{{username}}</el-text>
        <div v-show="userInfoShow" class="userInfoDiv">
          姓名:{{username}}
        </div>
      </div>
      <div class="body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .activeLi {
    color: #36c578;
  }

  ul {
    list-style: none;
    list-style-position: inside;
    padding: 0;
    margin: 0;
  }
  ul li {
    width: 100%;
    text-align: left;
    box-sizing: border-box;
    padding: 20px;
    font-size: 25px;
  }
  .layout {
    width: clamp(1200px,80vw,600px);
    height: 600px;
    display: flex;
    justify-content: space-between;
  }
  .aside {
    width: 200px;
    background-color: aliceblue;
  }
  .avatarImg {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }

  .header {
    height: 70px;
    line-height:70px;
    background-color: aliceblue;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
  }
  .userInfoDiv {
    position: absolute;
    top: 80px;
    background-color: aliceblue;
    width: 400px;
    height: 400px;
  }

  .header .el-text {
    margin: 0 10px;
  }
  .container {
    width: calc(100% - 200px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .body {
    flex: 1;
  }
</style>
