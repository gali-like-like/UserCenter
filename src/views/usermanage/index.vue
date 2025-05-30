<template>
  <div class="main">
    <el-form :model="condition" :inline="true" class="conditionArea">
      <el-form-item label="昵称">
        <el-input v-model="condition.userName" placeholder="请输入昵称" clearable size="large"/>
      </el-form-item>
      <el-form-item label="账号" >
        <el-input v-model="condition.userAccount" placeholder="请输入昵称" clearable size="large"/>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select
            v-model="condition.userStatus"
            placeholder="请输入用户状态"
            clearable
            size="large"
        >
          <el-option label="正常" value="正常" />
          <el-option label="禁用" value="封号" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="large">Query</el-button>
      </el-form-item>
    </el-form>
    <div class="tableArea">
      <el-table :data="userData" row-class-name="tableRow" :header-row-class-name="tableHeader">
        <el-table-column label="Account" width="180" prop="avatarUrl" >
          <template #default="scope">
            <div class="accountArea">
              <el-avatar :src="scope.row.avatarUrl"></el-avatar>
              <el-text>{{scope.row.userName}}</el-text>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="180" prop="userAccount"></el-table-column>
        <el-table-column label="手机号" width="180" prop="hiddenPhone"></el-table-column>
        <el-table-column label="用户状态" width="180" prop="userStatus"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleChangeStatus(scope.$index, scope.row)">
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
    </div>
  </div>
</template>

<script setup>
  import request from '@/utils/request';
  import { ref, reactive } from 'vue';
  import {ElMessageBox} from "element-plus";
  import messageBox from "@/utils/messageBox.js";
  const value = ref(false);

  function handleChangeStatus(index,row) {
    // todo 弹窗
    messageBox("禁用提示","是否禁用该用户","warning",() => {
      request.get(`/api/user/forbid?account=${row.userAccount}`);
    })
  }
  function handleDelete(index,row) {
    messageBox("删除提示","是否删除该用户","warnning",() => {
      request.delete("/api/user/delete",{
        params: {
          userId: row.id
        }
      });
    })
  }
  function handleReset(index,row) {
    messageBox("重置密码","是否重置密码","warnning",() => {
      request.post("/api/user/reset",{
        userAccount: row.userAccount,
        userPassword: "7777777"
      });
    });
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

  const condition = reactive({
    userName: null,
    userAccount: null,
    userPhone: null,
    userStatus: null
  })


  const onSubmit = () => {
    // 条件查询
  }

</script>

<style scoped>

  .tableArea,.tableRow,.tableHeader {
    background-color: rgba(111, 67, 218, 0.44);
    width: 100%;
  }
  .accountArea {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
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
  .conditionArea {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(111, 67, 218, 0.44);
  }
  .el-select {
    width: 200px;
  }
  .conditionArea>* {
    margin: 10px;
  }
</style>
