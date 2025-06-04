<script setup>
  import { ref, useTemplateRef } from 'vue';
  import {View} from "@element-plus/icons-vue";
  import MyInput from '@/components/MyInput.vue';
  import { userInfoStore } from '@/store/useUserInfo.js';
  import messageBox  from '@/utils/messageBox.js';
  import messageDialog from '@/utils/messageDialog.js';
  import request from '@/utils/request.js';
  import {passwordStore} from "@/store/usePasswordStore.js";
  import {phoneRegex, emailRegex, passwordRegex} from "@/utils/regex.js";
  import calculateFileSHA256 from "@/utils/sha256Tool.js";
  import message from "@/utils/messageDialog.js";

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
    console.log(`修改后的数据:${JSON.stringify(userStore.user)}`);
    if (isDisabled.value) {
    request.post("/api/user/edit",userStore.user).then(res => {
      if (res.code === 200)
        userStore.changeUser(res.data);
      })
    }

  }
  const isDisabled = ref(true);


  const usePdStore = passwordStore();
  const showDialog = ref(false);
  const updatePassword = () => {
    // 修改密码
    pdRef.value.validate((valid) => {
      if (valid) {
        request.post("/api/user/password",usePdStore.passwordForm).then(res => {
          if (res.code === 200) {
            showDialog.value = true;
          } else {
            showDialog.value = false;
            pdRef.value.resetFields();
          }
        });
      } else {
        console.log('提交失败!')
        return false;
      }
    })
  }
  const rules = ({
    newPassword: [
      { required: true, message: '请输入密码!', trigger: 'blur' },
      { min: 6, message: '密码长度必须超过六个字符', trigger: 'blur' },
      { pattern:  passwordRegex, message: '密码必须由数字组成,且长度至少6位',trigger: 'blur'}
    ],
    tryPassword: [
      { required: true, message: '请输入密码!', trigger: 'blur' },
      { min: 6, message: '密码长度必须超过六个字符', trigger: 'blur' },
      { pattern: passwordRegex, message: '密码必须由数字组成,且长度至少6位', trigger: 'blur' }
    ]
  });
  const pdRef = useTemplateRef("pdRef");
  const fileTypes = ['image/jpeg','image/png','image/jpg'];
  const beforeUpload = (rawFile) => {
    if (!fileTypes.includes(rawFile.type)) {
      message("图片格式必须是png,jpg,jpeg","error");
    } else if (rawFile.size / 1024 / 1024 > 10) {
      message("图片大小必须小于10MB");
    }
  }

  // 响应成功后该干的事情
  const handleAvatarSuccess = (
      response,
      uploadFile,
  ) => {
    console.log(`响应结果:${JSON.stringify(response)}`);
    userInfoStore().changeAvatarUrl(response.data);
  }

  const onSubmit = (option) => {
    const fileHash = calculateFileSHA256(option.file);
    let formdata = new FormData();
    formdata.append("file",option.file);
    formdata.append("fileHash",fileHash);
    request.post("/api/user/upload",formdata,{
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      console.log(res);
    })
  }
</script>

<template>
  <div class="mainContent">
    <div class="header">
      <el-image style="width: 100px; height: 100px" :src="userStore.user.avatarUrl" :fit="cover" class="headerImg"/>
      <div class="infoArea">
        <div>
          <span id="nameText">{{userStore.username}}</span>
          <span id="accountText">{{userStore.user.userAccount}}</span>
          <span id="userRoleText">{{userStore.user.userRole}}</span>
          <span id="userStatusText">{{ userStore.user.userStatus }}</span>
          <el-button type="primary" @click="showDialog = true">修改密码</el-button>

          <el-dialog v-model="showDialog" title="修改密码" width="500" >
            <el-form :model="usePdStore.passwordForm" :rules="rules" ref="pdRef">
                <el-form-item prop="newPassword">
                  <el-input v-model="usePdStore.passwordForm.newPassword"
                            placeholder="请输入密码" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="tryPassword">
                  <el-input v-model="usePdStore.passwordForm.tryPassword"
                            placeholder="请输入确认密码" type="password"  />
                </el-form-item>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="showDialog = false" size="large">Cancel</el-button>
                <el-button type="primary" @click="updatePassword" size="large">
                  Confirm
                </el-button>
              </div>
            </template>
          </el-dialog>

        </div>
        <el-button type="primary" @click="editOrSave">{{ isDisabled?'编辑':'保存' }}</el-button>
      </div>
    </div>
    <div class="main">
      <el-text>头像</el-text>
      <el-image :src="userStore.user.avatarUrl" :fit="cover" v-if="isDisabled"></el-image>
      <el-upload :on-success="handleAvatarSuccess" :before-upload="beforeUpload" :http-request="onSubmit" :with-credentials="true" class="uploadEle" v-if="!isDisabled">
      </el-upload>
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
    grid-template-rows: repeat(3,minmax(100px,150px));
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
    align-items: flex-start;
    margin-left: 10px;
    overflow:hidden;
    text-overflow:ellipsis;
    flex-grow: 1;
  }

  .infoArea > .el-button {
    align-self: center;
  }

  /* .infoArea>* {
    width: 100%;
  } */
  #nameText {
    font-size: 24px;
    color: #eb3131;
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
