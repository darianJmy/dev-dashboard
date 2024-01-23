<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElTable } from "element-plus";
import PhysicalReload from "./header/reload.vue";
import PhysicalInstall from "./header/install.vue";
import PhysicalCreate from "./header/create.vue";
import PhysicalImport from "./header/import.vue";
import PhysicalExport from "./header/export.vue";
import PhysicalInitialization from "./header/initialization.vue";
import PhysicalMore from "./header/more.vue";
import PhysicalTest from "./header/test.vue";
import PhysicalSelect from "./header/selectRole.vue";
import PhysicalBond from "./header/bond.vue";

import {
  getIpmiInfoList,
  deleteIpmiDelete,
  getIpmiInfoCollector
} from "@/api/basic";

const multipleTableRef = ref();
const Selection = ref([]);

const SelectionChange = (val: any) => {
  Selection.value = val;
  console.log(Selection.value);
};

const tableData = ref([]);
const pageSize = ref(100);
const currentPage = ref(1);
const total = ref(0);

onMounted(() => {
  getIPMIInfo();
});

async function getIPMIInfo() {
  const result = await getIpmiInfoList({
    pageSize: pageSize.value,
    currentPage: currentPage.value
  });
  tableData.value = result.data;
  total.value = result.total;
}

async function collectorRow(index: number) {
  await getIpmiInfoCollector({ host: tableData.value[index].host });
}

async function deleteRow(index: number) {
  await deleteIpmiDelete({ host: tableData.value[index].host });

  window.location.reload();
}

const parentData = Selection;
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <PhysicalReload />
        <PhysicalInstall />
        <PhysicalCreate />
        <PhysicalImport />
        <PhysicalExport />
        <PhysicalInitialization />
        <PhysicalTest :receivedData="parentData" />
        <PhysicalSelect />
        <PhysicalBond />
        <PhysicalMore />
      </div>
    </template>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="SelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="serial" label="资产编号" width="130" />
      <el-table-column prop="host" label="带外IP" width="130" />
      <el-table-column prop="firm" label="服务器厂商" width="130" />
      <el-table-column label="CPU数量" width="130">
        <template #default="scope">
          <div v-for="(cpuCount, index) in scope.row.cpus" :key="index">
            {{ cpuCount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="memorys" label="内存" width="130" />
      <el-table-column prop="ethernetInterfaces" label="网卡数量" width="130">
        <template #default="scope">
          <div v-for="(cpuCount, index) in scope.row.cpus" :key="index">
            {{ cpuCount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="disks" label="硬盘数量" width="130">
        <template #default="scope">
          <div v-for="(cpuCount, index) in scope.row.cpus" :key="index">
            {{ cpuCount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="更多操作" width="240">
        <template #default="scope">
          <el-button type="primary" link size="small">修改</el-button>
          <el-button
            type="primary"
            link
            size="small"
            @click.prevent="collectorRow(scope.$index)"
            >采集</el-button
          >
          <el-button
            type="danger"
            link
            size="small"
            @click.prevent="deleteRow(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        small
        background
        layout="->, total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getIPMIInfo"
        @current-change="getIPMIInfo"
      />
    </div>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  align-items: center;
}

.text {
  font-size: 14px;
}

.pagination-block {
  margin-top: 30px;
  margin-bottom: 5px;
}
</style>
