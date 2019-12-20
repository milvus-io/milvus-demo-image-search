import http from "./index";

export async function getTables(url, params = {}) {
  const res = http.get(url, { params });
  console.log(res);
}
