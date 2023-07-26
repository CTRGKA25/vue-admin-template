import request from "@/utils/request";
import { baseUrl } from "@/api/url";
export function getagentlist(data) {
  return request({
    url: `${baseUrl}/agent/list`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}
export function agentadd(data) {
  return request({
    url: `${baseUrl}/agent/add`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function agentupdate(data) {
  return request({
    url: `${baseUrl}/agent/update`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function agentdel(data) {
  return request({
    url: `${baseUrl}/agent/del/?id=${data}`,
    header: {
      "Content-Type": "application/json",
    },
    method: "post",
  });
}
