// 生成表单
import { MockMethod } from "vite-plugin-mock";

const tableData = [
  {
    asset: "420760270",
    ipmi: "10.251.255.23",
    firm: "浪潮",
    cpus: 2,
    memorys: 8,
    disks: 8,
    type: "Openstack服务器"
  },
  {
    asset: "420760271",
    ipmi: "10.251.255.24",
    firm: "浪潮",
    cpus: 2,
    memorys: 8,
    disks: 8,
    type: "Openstack服务器"
  }
];

const pageData = [
  {
    asset: "420760270",
    ipmi: "10.251.255.23",
    firm: "浪潮",
    cpus: 2,
    memorys: 8,
    disks: 8,
    type: "Openstack服务器"
  },
  {
    asset: "420760271",
    ipmi: "10.251.255.24",
    firm: "浪潮",
    cpus: 2,
    memorys: 8,
    disks: 8,
    type: "Openstack服务器"
  },
  {
    asset: "420760272",
    ipmi: "10.251.255.25",
    firm: "联想",
    cpus: 2,
    memorys: 8,
    disks: 8,
    type: "Openstack服务器"
  }
];

export default [
  {
    url: "/getTables",
    method: "get",
    response: ({ query }) => {
      if (query.pageSize === "100" && query.currentPage === "1") {
        return {
          success: true,
          data: tableData,
          total: 2
        };
      } else {
        return {
          success: true,
          data: pageData,
          total: 3
        };
      }
    }
  }
] as MockMethod[];
