<script setup lang="ts">
import { ref, reactive, watch } from "vue";

const dialog = ref(false);

const mega = ref([]);

const adapterMap = ref({});
const adapterOptions = ref([]);
const typeOptions = ref([
  { value: 1, label: "JBOD" },
  { value: 2, label: "RAID0" },
  { value: 3, label: "RAID1" },
  { value: 4, label: "RAID5" }
]);
const diskOptions = ref([]);

const ruleFormRef = ref<any>();
const ruleForm = ref({
  adapter: "",
  type: "",
  disk: ""
});
const rules = reactive({
  nonull: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur"
    }
  ]
});

async function CreateRAID() {
  console.log(ruleForm.value, "111");
  emit("closeDialog", false);
}

const close = () => {
  ruleFormRef.value.resetFields();
  emit("closeDialog", false);
};

interface DriveInfo {
  Adapter: string;
  RawSize: string;
  FirmwareState: string;
  EnclosureDevice: string;
  SlotNumber: string;
}

function formatAdapter(array: DriveInfo[]) {
  const adapterDict = {};
  for (const item of array) {
    const adapter = item.Adapter.substring(item.Adapter.indexOf("#") + 1);
    const rawSize = item.RawSize.replace(/\s*\[.*\]/, "");
    const firmwareState = item.FirmwareState.replace(/,.*/, "").trim();
    const encslot = `${item.EnclosureDevice}:${item.SlotNumber}`;
    if (adapter && rawSize) {
      if (adapterDict[adapter]) {
        adapterDict[adapter].push({
          size: rawSize,
          firm: firmwareState,
          slot: encslot
        });
      } else {
        adapterDict[adapter] = [
          {
            size: rawSize,
            firm: firmwareState,
            slot: encslot
          }
        ];
      }
    }
  }
  adapterMap.value = adapterDict;
  adapterOptions.value = Object.keys(adapterMap.value).map(adapter => ({
    value: adapter,
    label: adapter
  }));
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
  if (newInfo == null) {
    mega.value = [];
    formatAdapter(mega.value);
  } else {
    mega.value = newInfo;
    formatAdapter(mega.value);
  }
});

watch([() => ruleForm.value.adapter], ([newValue]) => {
  ruleForm.value.disk = "";
  if (newValue) {
    const disks = [];
    for (const item of adapterMap.value[newValue]) {
      const name = `${item.size} ${item.firm}`;
      disks.push({ value: item.slot, label: name });
    }
    diskOptions.value = disks;
  }
});
</script>

<template>
  <div>
    <el-dialog v-model="dialog" title="RAID管理" width="45%" @close="close">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="right"
        label-width="120px"
        style="padding-left: 30px; padding-right: 30px"
      >
        <el-form-item label="RAID设备" prop="nonull">
          <el-select
            v-model="ruleForm.adapter"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in adapterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择类型" prop="nonull">
          <el-select
            v-model="ruleForm.type"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择硬盘" prop="nonull">
          <el-select
            v-model="ruleForm.disk"
            style="width: 100%"
            multiple
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
      </el-form>
      <template #footer>
        <div>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="CreateRAID">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
