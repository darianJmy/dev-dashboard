<script setup lang="ts">
import { ref, watch } from "vue";
import { FormInstance } from "element-plus";

const props = defineProps({
  visible: { type: Boolean, default: false },
  id: { type: String, default: "" }
});
const emit = defineEmits(["closeDialog"]);

const dialog = ref(false);
const serial = ref();

const ruleFormRef = ref<FormInstance>();

const ruleForm = ref({
  serial: [],
  os: "",
  hostname: "",
  firstId: "",
  password: "",
  osDisk: "",
  osDiskOM: 0,
  net: ""
});

const osOptions = ref([
  { value: 1, label: "Centos7" },
  { value: 2, label: "Rocky8.5" },
  { value: 3, label: "Ubuntu20" }
]);

const serialOptions = ref([
  { value: 1, label: "420760270" },
  { value: 2, label: "420760271" },
  { value: 3, label: "420760272" }
]);

const diskOptions = ref([
  { value: 1, label: "sda" },
  { value: 2, label: "sdb" },
  { value: 3, label: "sdc" }
]);

const close = () => {
  emit("closeDialog", false);
  ruleFormRef.value.resetFields();
};

watch([() => props.visible, () => props.id], ([newVisible, newId]) => {
  dialog.value = newVisible;
  serial.value = newId;
});
</script>

<template>
  <el-dialog v-model="dialog" title="RAID管理" width="45%" @close="close">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-position="right"
      label-width="120px"
      style="padding-left: 30px; padding-right: 30px"
    >
      <el-form-item label="RAID设备">
        <el-select
          v-model="ruleForm.serial"
          style="width: 100%"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in serialOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="RAID类型">
        <el-select
          v-model="ruleForm.os"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in osOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择Slot">
        <el-select
          v-model="ruleForm.osDisk"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in diskOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
