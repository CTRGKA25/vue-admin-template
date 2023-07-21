import request from "@/utils/request";
import { baseUrl } from "@/api/url";
export function getcitylist(data) {
  return request({
    url: `${baseUrl}/city1/all`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}
export function city1add(data) {
  return request({
    url: `${baseUrl}/city1/add`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function city1update(data) {
  return request({
    url: `${baseUrl}/city1/update`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function city1del(data) {
  return request({
    url: `${baseUrl}/city1/del/?id=${data}`,
    header: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}
export function citylistCode() {
  return request({
    url: `${baseUrl}/city/listCode`,
    header: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
}
export function cityfirst() {
  return request({
    url: `${baseUrl}/city/first`,
    header: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
}
