<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus";

const dialog = ref(false);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  host: "",
  username: "",
  password: ""
});

const rules = reactive({
  host: [
    {
      required: true,
      pattern: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      message: "请输入有效IP",
      trigger: "blur"
    }
  ],
  username: [
    {
      required: true,
      message: "请输入登录用户",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入登录密码",
      trigger: "blur"
    }
  ]
});

function close() {
  ruleFormRef.value?.resetFields();
}

async function create() {
  for (const key in ruleForm) {
    if (!ruleForm[key]) {
      ElMessage({ showClose: true, message: "输入不能为空", type: "warning" });
      return;
    }
  }
  dialog.value = false;
}
</script>

<template>
  <el-button
    style="margin-left: 12px"
    @click="dialog = true"
    :icon="Plus"
    type="primary"
    >添加节点</el-button
  >
  <el-dialog
    v-model="dialog"
    title="添加节点信息"
    width="30%"
    style="padding-left: 30px; padding-right: 30px"
    @close="close"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="IP地址" prop="host">
        <el-input v-model="ruleForm.host" />
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
