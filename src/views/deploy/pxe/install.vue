<script setup lang="ts">
import { ref, reactive, watch } from "vue";

const dialog = ref(false);

const body = ref([]);

const serialOptions = ref([]);
const osOptions = ref([{ value: "Centos7", label: "Centos7" }]);
const diskOptions = ref([]);
const netOptions = ref([]);

const ruleFormRef = ref<any>();
const ruleForm = ref({
  serial: [],
  os: "",
  hostname: "",
  firstId: 1,
  password: "",
  osDisk: "",
  net: ""
});
const rules = reactive({
  serial: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ],
  os: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ],
  hostname: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ],
  firstId: [
    {
      required: true,
      message: "必须为数字",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ],
  osDisk: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ],
  net: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ]
});

async function create() {
  emit("closeDialog", false);
}

const close = () => {
  ruleFormRef.value.resetFields();
  emit("closeDialog", false);
};

interface SerialInfo {
  SerialID: string;
  Disk: Array<D>;
  EthInterface: Array<Eth>;
}

interface D {
  Name: string;
  Size: string;
}

interface Eth {
  MAC: string;
  Name: string;
}
function formatSerial(array: SerialInfo[]) {
  if (
    array.length == 0 ||
    array[0].Disk == null ||
    array[0].EthInterface == null
  ) {
    return;
  }
  const serialList = [];

  for (const item of array) {
    serialList.push({
      label: item.SerialID,
      value: item.SerialID
    });
  }

  const diskList = [];
  for (const item of array[0].Disk) {
    const name = `${item.Name} ${item.Size}`;
    diskList.push({ label: name, value: item.Name });
  }

  const netList = [];
  for (const item of array[0].EthInterface) {
    const name = `${item.Name} ${item.MAC}`;
    netList.push({ label: name, value: item.Name });
  }

  serialOptions.value = serialList;
  diskOptions.value = diskList;
  netOptions.value = netList;
}

const props = defineProps({
  visible: { type: Boolean, default: false },
  info: { type: Array, default: () => [] }
});

const emit = defineEmits(["closeDialog"]);

watch([() => props.visible], ([newVisible]) => {
  dialog.value = newVisible;
});

watch([() => props.info], ([newInfo]) => {
  body.value = newInfo;
  formatSerial(body.value);
});
</script>

<template>
  <div>
    <el-dialog v-model="dialog" title="批量装机" width="45%" @close="close">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="目标服务器" prop="serial">
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
        <el-form-item label="操作系统" prop="os">
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
        <el-form-item label="主机名前缀" prop="hostname">
          <el-input v-model="ruleForm.hostname" />
        </el-form-item>
        <el-form-item label="启始编号" prop="firstId">
          <el-input v-model="ruleForm.firstId" />
        </el-form-item>
        <el-form-item label="管理员密码" type="password" prop="password">
          <el-input v-model="ruleForm.password" show-password />
        </el-form-item>
        <el-form-item label="系统盘" prop="osDisk">
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
        <el-form-item label="管理网络" prop="net">
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
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="create">安装</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
