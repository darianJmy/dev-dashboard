<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({ dialog: String });
const emit = defineEmits({ name: String });

// 一些其他逻辑

function confirm() {
  console.log(props.dialog);
  emit("name", "这是一个值");
}
</script>

<template>
  <el-button @click="confirm">测试子组件</el-button>
</template>
