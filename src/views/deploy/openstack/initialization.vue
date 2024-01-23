<script setup lang="ts">
import { Loading } from "@element-plus/icons-vue";

function reloadPage() {
  window.location.reload();
}
</script>

<template>
  <el-button style="margin-left: 12px" @click="reloadPage" :icon="Loading"
    >初始化</el-button
  >
</template>
