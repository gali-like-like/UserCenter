<script setup>
import { ref, useTemplateRef, onMounted, nextTick } from 'vue';
import request from "@/utils/request.js";
const users = ref([]);
const scrollbar = ref(null);
const container = ref(null);
const currentPage = ref(1);
const beforeHeight = ref();
/**
 * 1. 缓存三次请求的数据 => 3页
 * 2. 第二页到第三页之间不请求数据
 * 3. 到达第三页时,请求第四页数据,删除第一页数据,此时就有2,3,4页数据
 * 4. 下滑到达第二页时,请求第一页数据,删除第四页数据,此时就有1,2,3页数据
 * 除非到达最后一页,否则前面每一页的数据数量都是一样,故此滑动距离是固定的,
 * scrolltop * 页数 + 视口高度（固定的）
 * */
const load = () => {
  request.post("/api/user/views",{
    current: currentPage.value,
    pageSize: 15
  }).then(res => {
    users.value = res.data;
  });
}

load();
</script>

<template>
  <div class="context">
    首页
  </div>
</template>

<style scoped>

</style>
