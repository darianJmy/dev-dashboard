<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import { postAUTOCreate } from "@/api/basic";

const dialog = ref(false);

const ruleFormRef = ref<any>();
const ruleForm = ref({
  serial_id: "",
  out_band_ip: "",
  out_band_username: "",
  out_band_password: ""
});
const rules = reactive({
  serial_id: [
    {
      required: true,
      message: "请输入资产编号",
      trigger: "blur"
    }
  ],
  out_band_ip: [
    {
      required: true,
      pattern: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      message: "请输入有效IP",
      trigger: "blur"
    }
  ],
  out_band_username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  out_band_password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ]
});

async function create() {
  for (const key in ruleForm.value) {
    if (!ruleForm.value[key]) {
      ElMessage({ showClose: true, message: "输入不能为空", type: "warning" });
      return;
    }
  }

  await postAUTOCreate(ruleForm.value);
  emit("closeDialog", false);
}

const close = () => {
  ruleFormRef.value.resetFields();
  emit("closeDialog", false);
};

const props = defineProps({
  visible: { type: Boolean, default: false }
});

const emit = defineEmits(["closeDialog"]);

watch([() => props.visible], ([newVisible]) => {
  dialog.value = newVisible;
});
</script>

<template>
  <div>
    <el-dialog
      v-model="dialog"
      title="新增带外服务器信息"
      width="40%"
      @close="close"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="资产编号" prop="serial_id">
          <el-input v-model="ruleForm.serial_id" />
        </el-form-item>
        <el-form-item label="带外IP" prop="out_band_ip">
          <el-input v-model="ruleForm.out_band_ip" />
        </el-form-item>
        <el-form-item label="用户名" prop="out_band_username">
          <el-input v-model="ruleForm.out_band_username" />
        </el-form-item>
        <el-form-item label="密码" prop="out_band_password" type="password">
          <el-input v-model="ruleForm.out_band_password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="create">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
