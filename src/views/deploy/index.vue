<script lang="ts" setup>
import { ref } from "vue";
import { Edit, Picture, UploadFilled } from "@element-plus/icons-vue";
import SubnetReload from "./subnet/reload.vue";
import SubnetCreate from "./subnet/create.vue";
import NetworkReload from "./network/reload.vue";
import NetworkCreate from "./network/create.vue";
import ML2Reload from "./ml2/reload.vue";
import ML2Create from "./ml2/create.vue";
import PXEReload from "./pxe/reload.vue";
import PXECreate from "./pxe/create.vue";
import PXEInstall from "./pxe/install.vue";
import PXESelectImage from "./pxe/selectImage.vue";
import PXERAID from "./pxe/raid.vue";
import PXEDELETE from "./pxe/delete.vue";
import OpenstackReload from "./openstack/reload.vue";
import OpenstackCreate from "./openstack/create.vue";
import OpenstackInitialization from "./openstack/initialization.vue";
import OpenstackInstall from "./openstack/install.vue";
import OpenstackSelectRole from "./openstack/selectRole.vue";

const active = ref(0);
function next() {
  if (active.value++ > 2) active.value = 0;
}

const activeName = ref("first");

const netTableData = ref([
  { name: "manager", types: "provider", net: "", ml2: "physnet1", desc: "测试" }
]);

const ipmiTableData = ref([
  {
    name: "未设置",
    serial: "12345",
    cpu: [8, 8],
    memory: "2G",
    disks: [
      { Name: "sda", Size: "20G" },
      { Name: "sdb", Size: "30G" }
    ],
    ethInterface: [
      { Name: "ens33", MAC: "00:0c:29:c1:2c:5c", Speed: 1000, Up: true },
      { Name: "ens34", MAC: "00:0c:29:c1:2c:5d", Speed: 1500, Up: false }
    ],
    power: "up",
    status: "已发现",
    firm: "浪潮"
  },
  {
    name: "未设置",
    serial: "123456",
    cpu: [8, 8],
    memory: "128G",
    disks: [
      { Name: "sda", Size: "20G" },
      { Name: "sdb", Size: "30G" }
    ],
    ethInterface: [
      { Name: "ens33", MAC: "00:0c:29:c1:2c:5c", Speed: 1000, Up: true },
      { Name: "ens34", MAC: "00:0c:29:c1:2c:5d", Speed: 1500, Up: false }
    ],
    power: "up",
    status: "已发现",
    firm: "烽火"
  }
]);

const hostTableData = ref([
  {
    name: "hc1",
    roles: ["管理", "计算", "控制"],
    status: "已发现",
    disks: "sda:1"
  }
]);

const subnetTableData = ref([
  {
    name: "10.22.41.0/24",
    subnet: "10.22.41.254",
    ipRange: [],
    vlanID: 2041,
    model: "management"
  }
]);

const raidval = ref(false);
const raidser = ref();
const addPxeRaidEvent = any => {
  raidval.value = true;
  raidser.value = any;
};
const closePXERaidEvent = () => {
  raidval.value = false;
};

const pxedelval = ref(false);
const pxedelser = ref();
const deletePxeEvent = any => {
  pxedelval.value = true;
  pxedelser.value = any;
};
const closePXEDelEvent = () => {
  pxedelval.value = false;
};
</script>

<style>
.card-header {
  display: flex;
  align-items: center;
}

.step_style {
  background-color: #eaf4fe;
  margin-top: 20px;
  margin-bottom: 20px;
}

.bottom-block {
  margin-top: 30px;
  margin-bottom: 5px;
  align-self: flex-end;
}
</style>

<template>
  <el-card>
    <template #header>
      <el-steps class="step_style" :space="200" :active="active" simple>
        <el-step title="网络管理" :icon="Edit" />
        <el-step title="批量装机" :icon="UploadFilled" />
        <el-step title="节点管理" :icon="Picture" />
      </el-steps>
    </template>

    <div v-if="active === 0">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="网段管理" name="second">
          <div class="card-header">
            <SubnetReload />
            <SubnetCreate />
          </div>
          <el-table
            :data="subnetTableData"
            style="width: 100%; margin-top: 20px; margin-bottom: 20px"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="name" label="网段" width="180" />
            <el-table-column prop="subnet" label="网关" width="180" />
            <el-table-column prop="ipRange" label="范围" />
            <el-table-column prop="vlanID" label="VLAN-ID" />
            <el-table-column prop="model" label="模式" />
            <el-table-column label="操作" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="网络管理" name="first">
          <div class="card-header">
            <NetworkReload />
            <NetworkCreate />
          </div>
          <el-table :data="netTableData" style="width: 100%">
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column prop="types" label="类型" width="180" />
            <el-table-column prop="net" label="网段" />
            <el-table-column prop="ml2" label="ML2网络" />
            <el-table-column prop="desc" label="描述" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="ML2网络" name="third">
          <div class="card-header">
            <ML2Reload />
            <ML2Create />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div v-if="active === 1">
      <div class="card-header">
        <PXEReload />
        <PXECreate />
        <PXEInstall />
        <PXESelectImage />
      </div>
      <el-table
        :data="ipmiTableData"
        style="width: 100%; margin-top: 20px; margin-bottom: 20px"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="主机名" width="135" />
        <el-table-column prop="serial" label="序列号" width="135" />
        <el-table-column label="cpu" width="120">
          <template #default="scope">
            <div v-for="(cpu, index) in scope.row.cpu" :key="index">
              <el-tag>{{ cpu }}核</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="memory" label="内存" width="120" />
        <el-table-column label="硬盘" width="120">
          <template #default="scope">
            <div v-for="(disk, index) in scope.row.disks" :key="index">
              {{ disk.Name }}:{{ disk.Size }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="网卡" width="120">
          <template #default="scope">
            <div v-for="(eth, index) in scope.row.ethInterface" :key="index">
              <el-tag type="success">{{ eth.Name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="电源" width="120">
          <template #default="scope">
            <el-tag type="success">{{ scope.row.power }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="firm" label="厂商" />
        <el-table-column label="操作" width="140">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="addPxeRaidEvent(scope.row.serial)"
              >RAID管理</el-button
            >

            <el-button
              link
              type="danger"
              size="small"
              @click="deletePxeEvent(scope.row.serial)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="active === 2">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="部署节点" name="first">
          <div class="card-header">
            <OpenstackReload />
            <OpenstackCreate />
            <OpenstackInitialization />
            <OpenstackInstall />
          </div>
          <el-table
            :data="hostTableData"
            style="width: 100%; margin-top: 20px; margin-bottom: 20px"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="主机名" width="180" />
            <el-table-column label="角色" width="180">
              <template #default="scope">
                <el-tag
                  v-for="(role, index) in hostTableData[scope.$index].roles"
                  :key="index"
                  style="margin-left: 2px"
                >
                  {{ role }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="disks" label="硬盘" />
            <el-table-column prop="firm" label="操作">
              <template>
                <OpenstackSelectRole />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="执行历史" name="second" />
      </el-tabs>
    </div>

    <div class="bottom-block">
      <el-button @click="next" type="primary">下一阶段</el-button>
    </div>
  </el-card>

  <PXERAID :visible="raidval" :id="raidser" @closeDialog="closePXERaidEvent" />
  <PXEDELETE
    :visible="pxedelval"
    :id="pxedelser"
    @closeDialog="closePXEDelEvent"
  />
</template>
