import request from "@/utils/request";
import { baseUrl } from "@/api/url";
export function getmcclist(data) {
  return request({
    url: `${baseUrl}/Mcc/all`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}
export function Mccadd(data) {
  return request({
    url: `${baseUrl}/Mcc/add`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function Mccupdate(data) {
  return request({
    url: `${baseUrl}/Mcc/update`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function Mccdel(data) {
  return request({
    url: `${baseUrl}/Mcc/del/?id=${data}`,
    header: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}
