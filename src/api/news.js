import request from "@/utils/request";
import { baseUrl } from "@/api/url";
export function getnewsall(data) {
  return request({
    url: `${baseUrl}/news/all`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}
export function newsadd(data) {
  return request({
    url: `${baseUrl}/news/add`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function newsupdate(data) {
  return request({
    url: `${baseUrl}/news/update`,
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data,
  });
}

export function newsdel(data) {
  return request({
    url: `${baseUrl}/news/del`,
    header: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}
