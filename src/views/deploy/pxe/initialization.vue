<script setup lang="ts">
import { Loading } from "@element-plus/icons-vue";
import { postIpmiSetBIOSTOPXE, postIpmiResart } from "@/api/basic";

async function pxeRow() {
  await postIpmiSetBIOSTOPXE({ host: "10.251.255.23" });
  await postIpmiResart({ host: "10.251.255.23" });
}
</script>

<template>
  <el-button
    style="margin-left: 12px"
    @click="pxeRow()"
    :icon="Loading"
    type="primary"
    >初始化</el-button
  >
</template>
