import http from "./index";

export async function getTables(params = {}) {
  const res = await http.get("/tables", { params });
  console.log(res);
  return res.data;
}

export async function createTable(data) {
  const res = await http.post("/tables", data);
  return res.data;
}

export async function deleteTable(name) {
  const res = await http.delete(`/tables/${name}`);
  console.log(res);
  return res.data;
}

export async function createIndex(tableName, data = {}) {
  const res = await http.post(`tables/${tableName}/indexes`,  data );
  console.log(res);
}

export async function searchTable(tableName) {
  const res = await http.get(`/tables/${tableName}`);
  return res.data;
}
