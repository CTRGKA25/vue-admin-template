import request from "@/utils/request";
import { baseUrl } from "@/api/url";
export function getbanklist(data) {
  return request({
    url: `${baseUrl}/Bank/all`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}
export function bankadd(data) {
  return request({
    url: `${baseUrl}/Bank/add`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function bankupdate(data) {
  return request({
    url: `${baseUrl}/Bank/update`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function bankdel(data) {
  return request({
    url: `${baseUrl}/Bank/del/?id=${data}`,
    header: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}
