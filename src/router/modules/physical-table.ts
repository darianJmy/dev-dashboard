export default {
  path: "/physical-table",
  name: "PhysicalTable",
  component: () => import("@/views/physical-table/index.vue"),
  meta: {
    icon: "TableAltFill",
    title: "服务器信息",
    rank: 2
  }
} as RouteConfigsTable;
