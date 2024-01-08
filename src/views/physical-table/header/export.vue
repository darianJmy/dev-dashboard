<script setup lang="ts">
import { reactive } from "vue";
import { Download } from "@element-plus/icons-vue";
import { utils, writeFile } from "xlsx";
import { getTables } from "@/api/physical-tables";

interface Asset {
  asset: string;
  ipmi: string;
  firm: string;
  cpus: number;
  memorys: number;
  disks: number;
  type: string;
}

interface Columns {
  title: string;
  dataKey: keyof Asset;
}

let physicalTable = reactive<Asset[]>([]);

const columns: Columns[] = [
  { title: "资产编号", dataKey: "asset" },
  { title: "带外IP", dataKey: "ipmi" },
  { title: "服务器厂商", dataKey: "firm" },
  { title: "CPU数量", dataKey: "cpus" },
  { title: "内存数量", dataKey: "memorys" },
  { title: "硬盘数量", dataKey: "disks" },
  { title: "节点类型", dataKey: "type" }
];

async function exportExcel() {
  const result = await getTables({
    pageSize: 100,
    currentPage: 1
  });
  physicalTable = result.data;
  excel();
}

const excel = () => {
  const res: string[][] = physicalTable.map((item: Asset) => {
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
