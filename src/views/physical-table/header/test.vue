<script setup lang="ts">
import { ref, defineProps } from "vue";
import { Tickets } from "@element-plus/icons-vue";

const xxxx = defineProps(["receivedData"]);
const dialog = ref(false);
</script>

<template>
  <el-button
    style="margin-left: 12px"
    @click="dialog = true"
    :icon="Tickets"
    type="primary"
    >测试</el-button
  >
  <el-dialog v-model="dialog" title="测试信息" width="40%">{{
    xxxx
  }}</el-dialog>
</template>
