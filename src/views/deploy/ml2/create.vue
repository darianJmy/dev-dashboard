<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus";

const dialog = ref(false);

const ruleFormRef = ref<FormInstance>();

const enableVlan = ref(true);

const ruleForm = ref({
  name: "",
  types: "",
  first_vlan: 500,
  end_vlan: 600
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
  first_vlan: [
    {
      required: true,
      message: "请输ML2网络",
      trigger: "blur"
    }
  ],
  end_vlan: [
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
  <el-dialog
    v-model="dialog"
    title="添加ML2网络"
    width="30%"
    @close="close"
    style="padding-left: 30px; padding-right: 30px"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="80px"
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
      <el-form-item label="VLAN范围" v-if="enableVlan === true">
        <el-input-number
          v-model="ruleForm.first_vlan"
          :min="1"
          :max="4000"
          controls-position="right"
        />
        <span style="font-weight: bold">—</span>
        <el-input-number
          v-model="ruleForm.end_vlan"
          :min="1"
          :max="4000"
          controls-position="right"
        />
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
