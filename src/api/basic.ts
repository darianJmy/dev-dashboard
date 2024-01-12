import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 查询IPMI列表 */
export const getIpmiList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("ipmi/list"), {
    params
  });
};

/** 创建IPMI */
export const postIpmiCreate = (data?: object) => {
  return http.request<any>("post", baseUrlApi("ipmi/create"), {
    data
  });
};

/** 删除IPMI */
export const deleteIpmiDelete = (data?: object) => {
  return http.request<any>("delete", baseUrlApi("ipmi/delete"), {
    data
  });
};

/** 设置IPMI服务器BIOS引导PXE */
export const postIpmiSetBIOSTOPXE = (data?: object) => {
  return http.request<any>("post", baseUrlApi("ipmi/bios/pxe"), {
    data
  });
};

/** 重启IPMI */
export const postIpmiResart = (data?: object) => {
  return http.request<any>("post", baseUrlApi("ipmi/restart"), {
    data
  });
};

/** 查询IPMI信息列表 */
export const getIpmiInfoList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("ipmi/info/list"), {
    params
  });
};

/** 模糊搜索IPMI信息列表 */
export const getIpmiInfoSearch = (params?: object) => {
  return http.request<any>("get", baseUrlApi("ipmi/info/search"), {
    params
  });
};

/** 采集IPMI信息 */
export const getIpmiInfoCollector = (params?: object) => {
  return http.request<any>("get", baseUrlApi("ipmi/info/collector"), {
    params
  });
};
