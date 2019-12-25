import http from "./index";

export async function getConfigs(params = {}) {
  const res = await http.get("/config/advanced", { params });
  console.log(res);
  return res.data;
}

export async function updateConfigs(data) {
  const res = await http.put("/config/advanced", data);
  return res.data;
}
