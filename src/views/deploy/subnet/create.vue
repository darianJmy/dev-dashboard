<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus";

const dialog = ref(false);

const ruleFormRef = ref<FormInstance>();

const ruleForm = ref({
  name: "",
  subnet: "",
  gateway: "",
  vip: "",
  vlan: 0,
  first_ip: "",
  end_ip: ""
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入网络",
      trigger: "blur"
    }
  ],
  subnet: [
    {
      required: true,
      message: "请输入网段",
      trigger: "blur"
    }
  ]
});

const nameOptions = ref([
  { value: 1, label: "manage" },
  { value: 2, label: "storage" },
  { value: 3, label: "public" }
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
  <el-dialog v-model="dialog" title="添加网段" width="40%" @close="close">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="网络" prop="name">
        <el-select
          v-model="ruleForm.name"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in nameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="网段" prop="subnet">
        <el-input v-model="ruleForm.subnet" />
      </el-form-item>
      <el-form-item label="网关">
        <el-input v-model="ruleForm.gateway" />
      </el-form-item>
      <el-form-item label="VIP">
        <el-input v-model="ruleForm.vip" />
      </el-form-item>
      <el-form-item label="VLAN">
        <el-input-number
          style="width: 100%"
          v-model="ruleForm.vlan"
          :min="1"
          :max="4000"
        />
      </el-form-item>
      <el-form-item label="地址池">
        <el-input style="width: 40%" v-model="ruleForm.first_ip" />
        <span style="font-weight: bold">-</span>
        <el-input style="width: 40%" v-model="ruleForm.end_ip" />
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
