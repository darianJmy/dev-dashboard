<script setup lang="ts">
import { ref, watch } from "vue";
import { FormInstance } from "element-plus";

const props = defineProps({
  visible: { type: Boolean, default: false },
  body: { type: Array, default: null }
});

const dialog = ref(false);
const info = ref([]);

const emit = defineEmits(["closeDialog"]);

watch([() => props.visible, () => props.body], ([newVisible, newBody]) => {
  dialog.value = newVisible;
  info.value = newBody;
  formatArrayToDictionary(info.value);
});

interface DriveInfo {
  SerialID: string;
  EthInterface: Array<Eth>;
}

interface Eth {
  MAC: string;
  Name: string;
}

function formatArrayToDictionary(array: DriveInfo[]) {
  const formattedDict: Record<string, string[]> = {};
  const serials = ref([]);
  for (const item of array) {
    serials.value.push({
      label: item.SerialID,
      value: item.SerialID
    });
  }

  const networks = ref([]);
  for (const item of array[0].EthInterface) {
    networks.value.push({
      label: item.Name,
      value: item.MAC
    });
  }

  serialOptions.value = serials.value;
  netOptions.value = networks.value;
  return formattedDict;
}

const close = () => {
  ruleFormRef.value.resetFields();
  emit("closeDialog", false);
};
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

const serialOptions = ref([]);

const osOptions = ref([{ value: "Centos7", label: "Centos7" }]);

const diskOptions = ref([]);

const netOptions = ref([]);

function create() {}
</script>

<template>
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
