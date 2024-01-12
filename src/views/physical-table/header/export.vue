<script setup lang="ts">
import { ref } from "vue";
import { Download } from "@element-plus/icons-vue";
import { utils, writeFile } from "xlsx";
import { getIpmiInfoList } from "@/api/basic";

interface Asset {
  serial: string;
  host: string;
  firm: string;
  cpus: number;
  memorys: number;
  ethernetInterfaces: number;
  disks: number;
}

interface Columns {
  title: string;
  dataKey: keyof Asset;
}

const physicalTable = ref([]);

const columns: Columns[] = [
  { title: "资产编号", dataKey: "serial" },
  { title: "带外IP", dataKey: "host" },
  { title: "服务器厂商", dataKey: "firm" },
  { title: "CPU数量", dataKey: "cpus" },
  { title: "内存数量", dataKey: "memorys" },
  { title: "网卡数量", dataKey: "ethernetInterfaces" },
  { title: "硬盘数量", dataKey: "disks" }
];

async function exportExcel() {
  const result = await getIpmiInfoList({
    pageSize: 100,
    currentPage: 1
  });
  physicalTable.value = result.data;
  excel();
}

const excel = () => {
  const res: string[][] = physicalTable.value.map((item: Asset) => {
    const arr = columns.map((column: Columns) => {
      return String(item[column.dataKey]);
    });
    return arr;
  });

  const titleList: string[] = columns.map((column: Columns) => {
    return column.title;
  });

  res.unshift(titleList);

  const workSheet = utils.aoa_to_sheet(res);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, "数据报表");

  writeFile(workBook, "PhysicalExport.xlsx");
};
</script>

<template>
  <el-button
    style="margin-left: 12px"
    type="primary"
    :icon="Download"
    @click="exportExcel"
    >导出</el-button
  >
</template>
