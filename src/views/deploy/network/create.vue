<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus";

const dialog = ref(false);

const ruleFormRef = ref<FormInstance>();

const ruleForm = ref({
  name: "",
  types: "",
  ml2: ""
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入网络名",
      trigger: "blur"
    }
  ],
  types: [
    {
      required: true,
      message: "请输入网络类型",
      trigger: "blur"
    }
  ],
  ml2: [
    {
      required: true,
      message: "请输ML2网络",
      trigger: "blur"
    }
  ]
});

const typesOptions = ref([
  { value: 1, label: "floating" },
  { value: 2, label: "provider" },
  { value: 3, label: "tenant" }
]);

const ml2Options = ref([
  { value: 1, label: "physnet1/flat" },
  { value: 2, label: "physnet2/flat" },
  { value: 3, label: "physnet3/vlan" }
]);

async function create() {
  for (const key in ruleForm.value) {
    if (!ruleForm.value[key]) {
      ElMessage({ showClose: true, message: "输入不能为空", type: "warning" });
      return;
    }
  }
  dialog.value = false;
}

function close() {
  ruleFormRef.value.resetFields();
}
</script>

<template>
  <el-button
    style="margin-left: 12px"
    @click="dialog = true"
    :icon="Plus"
    type="primary"
    >创建</el-button
  >
  <el-dialog v-model="dialog" title="添加网络" width="40%" @close="close">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="网络" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="类型" prop="types">
        <el-select
          v-model="ruleForm.types"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in typesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="ML2网络" prop="ml2">
        <el-select
          v-model="ruleForm.ml2"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in ml2Options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
