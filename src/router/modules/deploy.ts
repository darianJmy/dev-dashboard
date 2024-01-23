export default {
  path: "/deploy",
  name: "Deploy",
  component: () => import("@/views/deploy/index.vue"),
  meta: {
    icon: "TableAltFill",
    title: "Opensatck部署",
    rank: 3
  }
} as RouteConfigsTable;
