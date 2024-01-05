<script setup lang="ts">
import { Refresh } from "@element-plus/icons-vue";

function reloadPage() {
  window.location.reload();
}
</script>

<template>
  <el-button @click="reloadPage" :icon="Refresh" type="primary" />
</template>
