<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";

const dialog = ref(false);

const ruleForm = ref({
  role: []
});

function close() {
  ruleForm.value.role = [];
}

function create() {
  if (ruleForm.value.role.length === 0) {
    ElMessage({ showClose: true, message: "输入不能为空", type: "warning" });
    return;
  }

  dialog.value = false;
}
</script>

<template>
  <el-button @click="dialog = true" link type="primary">选择角色</el-button>
  <el-dialog
    v-model="dialog"
    title="设置角色"
    width="30%"
    style="padding-left: 30px; padding-right: 30px"
    @close="close"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="选择角色：">
        <el-checkbox-group v-model="ruleForm.role">
          <el-checkbox label="控制" name="controller" />
          <el-checkbox label="计算" name="compute" />
          <el-checkbox label="存储" name="storage" />
        </el-checkbox-group>
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
