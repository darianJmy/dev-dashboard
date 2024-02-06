<script setup lang="ts">
import { ref, watch } from "vue";
import { postAUTODelete } from "@/api/basic";

const dialog = ref(false);

const serial = ref();

async function DeleteAUTO() {
  await postAUTODelete({ serial_id: serial.value });
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
  <div>
    <el-dialog v-model="dialog" title="删除" width="25%" @close="close">
      <span>确定删除 {{ serial }} 此数据吗？</span>
      <template #footer>
        <div>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="DeleteAUTO">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
