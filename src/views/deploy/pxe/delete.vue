<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  visible: { type: Boolean, default: false },
  id: { type: String, default: "" }
});
const emit = defineEmits(["closeDialog"]);

const dialog = ref(false);
const serial = ref();

const close = () => {
  emit("closeDialog", false);
};

watch([() => props.visible, () => props.id], ([newVisible, newId]) => {
  dialog.value = newVisible;
  serial.value = newId;
});
</script>

<template>
  <el-dialog v-model="dialog" title="删除" width="45%" @close="close">
    <span>确定删除{{ serial }}此数据吗？</span>
    <template #footer>
      <div>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
