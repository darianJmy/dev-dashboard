<script setup lang="ts">
import { Tools } from "@element-plus/icons-vue";

function reloadPage() {
  window.location.reload();
}
</script>

<template>
  <el-button @click="reloadPage" :icon="Tools">部署集群</el-button>
</template>
