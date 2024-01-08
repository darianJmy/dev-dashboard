<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElTable } from "element-plus";
import PhysicalReload from "./header/reload.vue";
import PhysicalCreate from "./header/create.vue";
import PhysicalImport from "./header/import.vue";
import PhysicalExport from "./header/export.vue";
import PhysicalMore from "./header/more.vue";

import { getIpmiList } from "@/api/basic";

interface IPMI {
  serial: string;
  host: string;
  firm: string;
  username: number;
  password: number;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<IPMI[]>([]);

const handleSelectionChange = (val: IPMI[]) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};

const tableData = ref([]);
const pageSize = ref(100);
const currentPage = ref(1);
const total = ref();
onMounted(() => {
  getIPMI();
});

async function getIPMI() {
  const result = await getIpmiList({
    pageSize: pageSize,
    currentPage: currentPage
  });
  tableData.value = result.data;
  total.value = result.count;
}

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <PhysicalReload />
        <PhysicalCreate />
        <PhysicalImport />
        <PhysicalExport />
        <PhysicalMore />
      </div>
    </template>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="serial" label="资产编号" width="180" />
      <el-table-column prop="host" label="带外IP" width="140" />
      <el-table-column prop="firm" label="服务器厂商" width="130" />
      <el-table-column prop="username" label="用户名" width="100" />
      <el-table-column prop="password" label="密码" width="80" />
      <el-table-column fixed="right" label="更多操作" width="240">
        <template #default="scope">
          <el-button type="primary" link size="small">修改</el-button>
          <el-button
            type="danger"
            link
            size="small"
            @click.prevent="deleteRow(scope.$index)"
            >删除</el-button
          >
          <el-button type="primary" link size="small">远程安装</el-button>
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
        @size-change="getIPMI"
        @current-change="getIPMI"
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
