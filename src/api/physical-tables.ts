import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
  total: Number;
};

export const getTables = (params?: object) => {
  return http.request<Result>("get", "/getTables", { params });
};
