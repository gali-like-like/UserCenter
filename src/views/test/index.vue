<template>
  <el-upload
      class="avatar-uploader"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :with-credentials="true"
      :http-request="httpRequest"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import calculateFileSHA256 from '@/utils/sha256Tool.js';
import request  from '@/utils/request'
const imageUrl = ref('');
// 响应成功后该干的事情
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile,
) => {
  console.log(`响应结果:${JSON.stringify(response)}`);
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
}

//自定义函数用来覆盖原有的XHR行为（默认提交行为）
async function httpRequest(option) {
  const fileHash = await calculateFileSHA256(option.file);
  let dataForm = new FormData();
  dataForm.append("file", option.file);
  dataForm.append("fileHash", fileHash);
  request({
    method: 'POST',
    url: '/api/user/upload',
    data: dataForm,
//设置请求参数的规则
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => {
    console.log(response);
  })
}

const fileTypes = ['image/jpeg','image/png','image/jpg'];
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 上传文件前的一个判断
  if (!fileTypes.includes(rawFile.type)) {
    ElMessage.error('图片格式必须是png,jpg,jpeg')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小必须小于10MB')
    return false
  }
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
