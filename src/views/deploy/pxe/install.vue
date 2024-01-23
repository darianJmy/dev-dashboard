<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";

const dialog = ref(false);

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

const netOptions = ref([
  { value: 1, label: "eth0" },
  { value: 2, label: "eth1" },
  { value: 3, label: "eth2" }
]);

function create() {}

function close() {
  ruleFormRef.value.resetFields();
}

const numberChange = (val: number) => {
  ruleForm.value.osDiskOM = val;
};
</script>

<template>
  <el-button
    style="margin-left: 12px"
    :icon="Plus"
    @click="dialog = true"
    type="primary"
    >批量装机</el-button
  >

  <el-dialog v-model="dialog" title="批量装机" width="45%" @close="close">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-position="right"
      label-width="90px"
    >
      <el-form-item label="目标服务器">
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
      <el-form-item label="操作系统">
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
      <el-form-item label="主机名前缀">
        <el-input v-model="ruleForm.hostname" />
      </el-form-item>
      <el-form-item label="启始编号">
        <el-input v-model="ruleForm.firstId" />
      </el-form-item>
      <el-form-item label="管理员密码" type="password">
        <el-input v-model="ruleForm.password" show-password />
      </el-form-item>
      <el-form-item label="系统盘">
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
      <el-form-item label="系统盘大小">
        <el-input-number
          style="width: 100%"
          v-model="ruleForm.osDiskOM"
          :min="60"
          :max="200"
          @change="numberChange"
        />
      </el-form-item>
      <el-form-item label="管理网络">
        <el-select
          v-model="ruleForm.net"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in netOptions"
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
        <el-button type="primary" @click="create">安装</el-button>
      </div>
    </template>
  </el-dialog>
</template>
