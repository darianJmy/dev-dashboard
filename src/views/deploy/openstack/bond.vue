<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";

const dialog = ref(false);
const buttonDialog = ref(false);

const tableData = ref([
  { ethinterface: 1, children: [{ ethinterface: 3 }, { ethinterface: 2 }] },
  { ethinterface: 2 }
]);

const bondData = ref([]);

const ruleFormRef = ref<FormInstance>();

const ruleForm = ref({
  bondType: "",
  eths: []
});

const bondNameOptions = ref([
  { value: 1, label: "bond_manager" },
  { value: 2, label: "bond_compute" },
  { value: 3, label: "bond_public" }
]);

const bondTypeOptions = ref([
  { value: 1, label: "Bond1" },
  { value: 2, label: "Bond4" }
]);

const ethOptions = ref([
  { value: 1, label: "eth0" },
  { value: 2, label: "eth1" },
  { value: 3, label: "eth2" }
]);
</script>

<style>
.eth-header {
  padding: 20px;
  margin-bottom: 5px;
  border: 1px solid rgba(128, 128, 128, 0.2);
  display: flex;
  justify-content: space-between; /* Added to space items at both ends */
  align-items: center; /* Optional: Center items vertically */
  font-size: 16px; /* Adjust the font size as needed */
  font-weight: bold; /* Make the text bold */
}

.eth-center {
  padding: 20px;
  margin-bottom: 5px;
  border: 1px solid rgba(128, 128, 128, 0.2);
  background-color: #eaf4fe;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Optional: Center items vertically */
  font-size: 16px; /* Adjust the font size as needed */
  font-weight: bold; /* Make the text bold */

  .span {
    margin-left: 10px;
  }
}
</style>

<template>
  <el-button
    style="margin-left: 12px"
    @click="dialog = true"
    :icon="Plus"
    type="primary"
    >Bond</el-button
  >
  <el-dialog v-model="dialog" title="网卡管理" width="60%">
    <div class="eth-header">
      <span>Bond列表</span>
      <el-button
        style="posistion-right"
        type="primary"
        @click="buttonDialog = true"
        >Bond</el-button
      >
    </div>
    <div class="eth-center" v-for="(cpuCount, index) in bondData" :key="index">
      <span>eth1</span>
      <span>状态：UP</span>
      <div v-for="(cpuCount, index) in bondData" :key="index">
        {{ cpuCount }}
      </div>
      <span>mac：xxxxxxxx</span>
      <span>speed：2000</span>
    </div>

    <div class="eth-header">
      <span>网卡列表</span>
    </div>

    <div class="eth-center" v-for="(cpuCount, index) in tableData" :key="index">
      <span>eth1</span>
      <span>状态：UP</span>
      <span>mac：xxxxxxxx</span>
      <span>speed：2000</span>
    </div>
    <template #footer>
      <div>
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="dialog = false">确认</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="buttonDialog" title="创建Bond" width="30%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="选择Bond名称" prop="serial">
        <el-select
          v-model="ruleForm.bondType"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in bondNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择Bond模式" prop="serial">
        <el-select
          v-model="ruleForm.bondType"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in bondTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择网卡" prop="host">
        <el-select
          v-model="ruleForm.eths"
          multiple
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in ethOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="buttonDialog = false">取消</el-button>
        <el-button type="primary" @click="buttonDialog = false">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
