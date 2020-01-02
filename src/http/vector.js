import http from "./index";

export async function searchVectors(data = {}) {
  const copyData = JSON.parse(JSON.stringify(data));
  delete copyData.tableName;
  const res = await http.put(`/tables/${data.tableName}/vectors`, copyData);

  return res.data;
}
