<script setup>
import { ref } from 'vue';
import request from "@/utils/request.js";
const users = ref(null);
const isLoad = ref(true);
const current = ref(1);
const load = () => {
  if (isLoad) {
    request.post("/api/user/views",{
      current: current.value,
      pageSize: 10
    }).then(res => {
      if (res.code === 200) {
        users.value = res.data;
        if (!users.value) {
          isLoad.value = false;
        }
        current.value += 1;
      } else {
        isLoad.value = false;
      }
    }).catch(e => {
      isLoad.value = false;
    })
  }

}
load();
const jumpUser = (id) => {
  console.log(`用户id:${id}`);
}
</script>

<template>
  <div>
    <ul v-infinite-scroll="load" class="infinite-list" :infinite-scroll-disabled="isLoad">
      <li v-for="i in users" :key="i.id" class="infinite-list-item" @click="jumpUser">
        <div>
          <el-avatar :size="50" :src="i.avatarUrl" />
          <el-text type="primary" size="large" >{{i.userName}}</el-text>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .infinite-list {
    overflow: auto;
    list-style-position: inside;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
