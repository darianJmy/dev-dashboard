<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  Refresh,
  Plus,
  SetUp,
  Edit,
  Picture,
  UploadFilled
} from "@element-plus/icons-vue";
import PXECREATE from "./pxe/create.vue";
import PXEINSTALL from "./pxe/install.vue";
import PXESETPXE from "./pxe/setpxe.vue";
import PXERAID from "./pxe/raid.vue";
import PXEDELETE from "./pxe/delete.vue";

import { getAUTOList } from "@/api/basic";

onMounted(() => {
  getAUTO();
});

const ipmiTableData = ref([]);

async function getAUTO() {
  const result = await getAUTOList();
  ipmiTableData.value = result.data;
}
const Selection = ref([]);

const SelectionChange = (val: any) => {
  Selection.value = val;
};

const createval = ref(false);
const addPxeCreateEvent = () => {
  createval.value = true;
};
const closePxeCreateEvent = () => {
  createval.value = false;
  getAUTO();
};

const installval = ref(false);
const installbody = ref();
const addPxeInstallEvent = () => {
  installval.value = true;
  installbody.value = Selection.value;
};
const closePxeInstallEvent = () => {
  installval.value = false;
  getAUTO();
};

const setpxeval = ref(false);
const setpxeser = ref();
const addPxeSetpxeEvent = any => {
  setpxeval.value = true;
  setpxeser.value = any;
};
const closePxeSetpxeEvent = () => {
  setpxeval.value = false;
};

const raidval = ref(false);
const raidmega = ref();
const addPxeRaidEvent = any => {
  raidval.value = true;
  raidmega.value = any;
};
const closePxeRaidEvent = () => {
  raidval.value = false;
  getAUTO();
};

const pxedelval = ref(false);
const pxedelser = ref();
const addPxeDeleteEvent = any => {
  pxedelval.value = true;
  pxedelser.value = any;
};
const closePxeDeleteEvent = () => {
  pxedelval.value = false;
  getAUTO();
};
</script>

<style>
.card-header {
  display: flex;
  align-items: center;
}

.step_style {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #eaf4fe;
}

.bottom-block {
  align-self: flex-end;
  margin-top: 30px;
  margin-bottom: 5px;
}
</style>

<template>
  <el-card>
    <template #header>
      <el-steps class="step_style" :space="200" simple>
        <el-step title="网络管理" :icon="Edit" />
        <el-step title="批量装机" :icon="UploadFilled" />
        <el-step title="节点管理" :icon="Picture" />
      </el-steps>
    </template>

    <div class="card-header">
      <el-button @click="getAUTO" :icon="Refresh" />
      <el-button :icon="Plus" type="primary" @click="addPxeCreateEvent()"
        >新增设备</el-button
      >
      <el-button :icon="SetUp" type="primary" @click="addPxeInstallEvent()"
        >批量装机</el-button
      >
    </div>
    <el-table
      :data="ipmiTableData"
      style="width: 100%; margin-top: 20px; margin-bottom: 20px"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @selection-change="SelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="HostName" label="主机名" width="150" />
      <el-table-column prop="SerialID" label="序列号" width="150" />
      <el-table-column label="cpu" width="130">
        <template #default="scope">
          <div v-for="(cpu, index) in scope.row.CPU" :key="index">
            <el-tag>{{ cpu.Cores }}核</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Memory" label="内存" width="130" />
      <el-table-column label="硬盘" width="160">
        <template #default="scope">
          <div v-for="(disk, index) in scope.row.Disk" :key="index">
            <el-tag>{{ disk.Name }}:{{ disk.Size }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="网卡" width="200">
        <template #default="scope">
          <div v-for="(eth, index) in scope.row.EthInterface" :key="index">
            <el-tag type="success">{{ eth.Name }}:{{ eth.MAC }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Tasks" label="当前任务" width="200" />
      <el-table-column label="电源" width="120" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="addPxeSetpxeEvent(scope.row.SerialID)"
            >进入PXE</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="addPxeRaidEvent(scope.row.Mega)"
            >RAID管理</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="addPxeDeleteEvent(scope.row.SerialID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <PXECREATE :visible="createval" @closeDialog="closePxeCreateEvent" />
  <PXEINSTALL
    :visible="installval"
    :body="installbody"
    @closeDialog="closePxeInstallEvent"
  />
  <PXESETPXE
    :visible="setpxeval"
    :id="setpxeser"
    @closeDialog="closePxeSetpxeEvent"
  />
  <PXERAID
    :visible="raidval"
    :info="raidmega"
    @closeDialog="closePxeRaidEvent"
  />
  <PXEDELETE
    :visible="pxedelval"
    :id="pxedelser"
    @closeDialog="closePxeDeleteEvent"
  />
</template>
