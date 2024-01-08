<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus";
import { createIpmi } from "@/api/basic";

const dialog = ref(false);

const ruleFormRef = ref<FormInstance>();

const ruleForm = ref({
  serial: "",
  host: "",
  firm: "",
  username: "",
  password: ""
});

const rules = reactive({
  serial: [
    {
      required: true,
      message: "请输入资产编号",
      trigger: "blur"
    }
  ],
  host: [
    {
      required: true,
      pattern: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      message: "请输入有效IP",
      trigger: "blur"
    }
  ],
  firm: [
    {
      required: true,
      message: "请输服务器厂商",
      trigger: "blur"
    }
  ],
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ]
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

async function create() {
  if (!check()) {
    ElMessage({ showClose: true, message: "输入不能为空", type: "warning" });
    return;
  }
  const result = await createIpmi(ruleForm.value);
  dialog.value = true;
  //reload();
  console.log(result);
}

function check() {
  for (const key in ruleForm.value) {
    if (!ruleForm.value[key]) {
      return false;
    }
  }
  return true;
}

// function reload() {
//   window.location.reload();
// }

function close() {
  resetForm(ruleFormRef.value);
}
</script>

<template>
  <el-button @click="dialog = true" :icon="Plus" type="primary"
    >新增设备</el-button
  >
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
      <el-form-item label="资产编号" prop="serial">
        <el-input v-model="ruleForm.serial" />
      </el-form-item>
      <el-form-item label="带外IP" prop="ipmi">
        <el-input v-model="ruleForm.host" />
      </el-form-item>
      <el-form-item label="服务器厂商" prop="firm">
        <el-input v-model="ruleForm.firm" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password" type="password">
        <el-input v-model="ruleForm.password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="create">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
