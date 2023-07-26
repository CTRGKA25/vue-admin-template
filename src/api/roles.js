import request from "@/utils/request";
import { baseUrl } from "@/api/url";
export function getRoleall(data) {
  return request({
    url: `${baseUrl}/Role/all`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}
export function Roleadd(data) {
  return request({
    url: `${baseUrl}/Role/add`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function Roleupdate(data) {
  return request({
    url: `${baseUrl}/Role/update`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function Roledel(data) {
  return request({
    url: `${baseUrl}/Role/del`,
    header: {
      "Content-Type": "application/json",
    },
    method: "post",
    data,
  });
}
