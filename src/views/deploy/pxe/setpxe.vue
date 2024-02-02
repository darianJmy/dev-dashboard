<script setup lang="ts">
import { ref, watch } from "vue";
import { postAUTOPXE, postAUTORestart } from "@/api/basic";

const dialog = ref(false);

const serial = ref();

async function restartAUTO() {
  await postAUTOPXE([serial.value]);
  await postAUTORestart([serial.value]);
  emit("closeDialog", false);
}

const close = () => {
  serial.value = "";
  emit("closeDialog", false);
};

const props = defineProps({
  visible: { type: Boolean, default: false },
  id: { type: String, default: "" }
});

const emit = defineEmits(["closeDialog"]);

watch([() => props.visible, () => props.id], ([newVisible, newId]) => {
  dialog.value = newVisible;
  serial.value = newId;
});
</script>

<template>
  <el-dialog v-model="dialog" title="进入PXE" width="25%" @close="close">
    <span>进入PXE需要重启，是否确定？</span>
    <template #footer>
      <div>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="restartAUTO">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
