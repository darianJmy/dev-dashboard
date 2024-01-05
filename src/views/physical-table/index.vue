<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElTable } from "element-plus";
import { Plus, More } from "@element-plus/icons-vue";
import { getTables } from "@/api/physical-tables";
import PhysicalReload from "./header/reload.vue";

interface Asset {
  asset: string;
  ipmi: string;
  firm: string;
  cpus: number;
  memorys: number;
  disks: number;
  type: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Asset[]>([]);

const handleSelectionChange = (val: Asset[]) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};

const tableData = ref([]);
const pageSize = ref(100);
const currentPage = ref(1);
const total = ref();
onMounted(async () => {
  const result = await getTables({
    pageSize: pageSize.value,
    currentPage: currentPage.value
  });
  tableData.value = result.data;
  total.value = result.total;
});

async function handleChange() {
  const result = await getTables({
    pageSize: pageSize.value,
    currentPage: currentPage.value
  });
  tableData.value = result.data;
  total.value = result.total;
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
        <el-button type="primary" :icon="Plus">创建</el-button>
        <el-button type="primary" :icon="More">更多</el-button>
      </div>
    </template>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="asset" label="资产编号" width="180" />
      <el-table-column prop="ipmi" label="带外IP" width="180" />
      <el-table-column prop="firm" label="服务器厂商" width="180" />
      <el-table-column prop="cpus" label="CPU数量" width="180" />
      <el-table-column prop="memorys" label="内存数量" width="180" />
      <el-table-column prop="disks" label="硬盘数量" width="180" />
      <el-table-column prop="type" label="节点类型" />
      <el-table-column label="更多操作">
        <template #default="scope">
          <el-button type="primary" size="small">修改</el-button>
          <el-button
            type="danger"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
            >删除</el-button
          >
          <el-button type="primary" size="small">远程安装</el-button>
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
        @size-change="handleChange"
        @current-change="handleChange"
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
