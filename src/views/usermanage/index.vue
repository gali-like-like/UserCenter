<template>
  <div class="main">
    <el-table :data="userData" style="width: 100%">
      <el-table-column label="Account" width="180" prop="avatarUrl">
        <template #default="scope">
          <el-avatar :src="scope.row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="180" prop="userName"></el-table-column>
      <el-table-column label="账号" width="180" prop="userAccount"></el-table-column>
      <el-table-column label="手机号" width="180" prop="hiddenPhone"></el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Ban
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleReset(scope.$index, scope.row)"
          >
            Reset
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :hide-on-single-page="value"
        :total="total"
        layout="prev, pager, next"
        @current-change="getPageData"
    />
<!--    <el-pagination layout="prev, pager, next" :total="1000" @current-change="getPageData"/>-->
  </div>
</template>

<script setup>
  import request from '@/utils/request';
  import { ref } from 'vue';
  const value = ref(false);

  function handleEdit(index,row) {
    console.log(`row:${row},index:${index}`);
  }
  function handleDelete(index,row) {
    console.log(`row:${row},index:${index}`);
  }
  function handleReset(index,row) {
    console.log(`row:${row},index:${index}`);
  }
  const userData = ref([]);
  const total = ref([]);
  const getPageData = (current) => {
    request.post("/api/user/page",{
      current: current,
      pageSize: 10
    }).then(res => {
      if (res.code === 200) {
        userData.value = res.data.records;
        total.value = res.data.total;
      }
    })
  }
  getPageData(1);

  const load = () => {
    console.log('load');
  }
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-evenly;
  }
  .el-pagination {
    display: flex;
    justify-content: center; /* 水平居中 */
  }
</style>
