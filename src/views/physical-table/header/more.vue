<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";

const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`);
};
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>

<template>
  <el-dropdown style="margin-left: 12px" @command="handleCommand">
    <el-button type="primary">
      更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="a" disabled>批量删除</el-dropdown-item>
        <el-dropdown-item command="c" disabled>RAID管理</el-dropdown-item>
        <el-dropdown-item command="d" disabled>网卡配置</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
