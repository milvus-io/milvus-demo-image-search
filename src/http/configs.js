import http from "./index";

export async function getAdvancedConfig(params = {}) {
  const res = await http.get("/config/advanced", { params });
  return res.data;
}

export async function updateAdvancedConfig(data) {
  const res = await http.put("/config/advanced", data);
  return res.data;
}

export async function getHardwareConfig(params = {}) {
  const res = await http.get("/config/gpu_resources", { params });
  return res.data;
}

export async function updateHardwareConfig(data) {
  const res = await http.put("/config/gpu_resources", data);
  return res.data;
}

export async function getSystemConfig() {
  const res = await http.get("/devices");
  const { gpus, cpu = {} } = res.data || {};
  let gpuList = [];
  let cpuMemory = cpu.memory || 1000;
  let gpuMemory = 1000000;
  if (gpus) {
    gpuList = [...gpuList, ...Object.keys(gpus)];
    gpuMemory = gpuList.reduce((pre, cur) => {
      if (gpus[cur]) {
        return Math.min(pre, gpus[cur].memory);
      }
      return pre;
    }, gpuMemory);
  }
  return {
    gpuList,
    gpuMemory,
    cpuMemory
  };
}

export async function getHardwareType() {
  const res = await http.get("/system/mode");
  // return "CPU";
  return res.data ? res.data.reply || "CPU" : "CPU";
}
