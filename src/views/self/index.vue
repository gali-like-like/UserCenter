<script setup>
  import { ref } from 'vue';
  import {View} from "@element-plus/icons-vue";
  import MyInput from '@/components/MyInput.vue';
  import { userInfoStore } from '@/store/useUserInfo.js';
  import messageBox  from '@/utils/messageBox.js';
  import messageDialog from '@/utils/messageDialog.js';
  import request from '@/utils/request.js';
  const userStore = userInfoStore();
  const showCompletePhone = () => {
    request.post("/api/user/phone").then(res => {
      if(res.code === 200)
        messageDialog(`完整手机号:${res.data}`,'info');
    })
  }
  const showCompleteEmail = () => {
    request.post("/api/user/email").then(res => {
      if(res.code === 200)
        messageDialog(`完整邮箱:${res.data}`,'info');
    })
  }
  const editOrSave = () => {
    isDisabled.value = !isDisabled.value;
    // todo 发送请求修改数据并获取当前用户
    console.log(userStore.baseUser);
    if (isDisabled.value) {
    request.post("/api/user/edit",userStore.baseUser,data).then(res => {
      if (res.code === 200)
        userStore.changeUser(res.data);
      })
    }

  }
  const isDisabled = ref(true);
</script>

<template>
  <div class="mainContent">
    <div class="header">
      <el-image style="width: 100px; height: 100px" :src="userStore.user.avatarUrl" :fit="cover" class="headerImg"/>
      <div class="infoArea">
        <div>
          <el-text id="nameText" type="primary">{{userStore.username}}</el-text>
          <el-text id="accountText" type="danger">{{userStore.user.userAccount}}</el-text>
          <el-text id="userRoleText" type="primary">{{userStore.user.userRole}}</el-text>
          <el-text id="userStatusText" type="primary">{{ userStore.user.userStatus }}</el-text>
        </div>
        <el-button type="primary" @click="editOrSave">{{ isDisabled?'编辑':'保存' }}</el-button>
      </div>
    </div>
    <div class="main">
      <el-text>头像</el-text>
      <el-image :src="userStore.user.avatarUrl" :fit="cover"></el-image>
      <el-text>账号</el-text>
      <el-text>{{userStore.user.userAccount}}</el-text>
      <el-text>昵称</el-text>
      <!-- <el-text>{{userStore.user.userName}}</el-text> -->
      <MyInput v-model:value="userStore.user.userName" v-model:isEdit="isDisabled"></MyInput>
      <el-text>手机号</el-text>
      <MyInput v-model:value="userStore.user.hiddenPhone" v-model:isEdit="isDisabled">
        <template #suffix>
          <el-text @click="showCompletePhone">显示</el-text>
        </template>
      </MyInput>
      <el-text>邮箱</el-text>
      <MyInput v-model:value="userStore.user.hiddenEmail" v-model:isEdit="isDisabled">
        <template #suffix>
          <el-text @click="showCompleteEmail">显示</el-text>
        </template>
      </MyInput>
      <el-text>注册日期</el-text>
      <el-text>{{ userStore.user.createTime }}</el-text>
    </div>
  </div>
</template>

<style scoped>
  .main {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    /* grid-template-rows: repeat(3,1fr); */
    grid-template-rows: repeat(3,minmax(100px,1fr));
    font-size: 24px;
    height: calc(100% - 100px);
  }

  .headerImg.el-image {
    border-radius: 5px;
    flex-grow: 0;
  }
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .infoArea {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
    flex-wrap: wrap;
    align-content: space-around;
    text-align: left;
  }
  .infoArea>div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .infoArea > .el-button {
    align-self: center;
  }

  /* .infoArea>* {
    width: 100%;
  } */
  #nameText {
    font-size: 24px;
    color: black;
    font-weight: bold;
  }
  #accountText {
    font-size: 20px;
    color: black;
  }
  #userRoleText,#userStatusText {
    font-size: 14px;
    color: black;
  }
  * {
    color: black;
    font-size: 24px;
  }
</style>
