<script setup lang="ts">
import { ref } from "vue";
import { Select } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";
const dialog = ref(false);

const ruleFormRef = ref<FormInstance>();

const ruleForm = ref({
  type: []
});

function close() {
  ruleFormRef.value.resetFields();
}
</script>

<template>
  <el-button
    style="margin-left: 12px"
    @click="dialog = true"
    :icon="Select"
    type="primary"
    >选择角色</el-button
  >
  <el-dialog v-model="dialog" title="设置角色" width="40%" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" label-position="right">
      <el-form-item label="选择角色：">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="控制" name="type" />
          <el-checkbox label="计算" name="type" />
          <el-checkbox label="存储" name="type" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="dialog = false">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
