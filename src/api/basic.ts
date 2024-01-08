import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 登录 */
export const getIpmiList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("ipmi/list"), {
    params
  });
};

export const createIpmi = (data?: object) => {
  return http.request<any>("post", baseUrlApi("ipmi/create"), {
    data
  });
};
