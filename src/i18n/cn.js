export default {
  lang: "中文",
  config: {
    title: "配置",
    advanced: "高级配置",
    hardware: "硬件资源"
  },
  dataManage: {
    title: "数据管理",
    table: "表和索引"
  },
  table: {
    create: "新建表",
    index: "更新 Index 表",
    saveSuccess: "表创建成功",
    delete: "删除表成功",
    confirmDel: "是否确认删除表",
    searchTxt: "请输入表名",
    updateIndex: "更新索引",
    tName: "表名",
    tDimension: "维度",
    tMetric: "Metric 类型",
    tIndex: "索引",
    tAction: "操作",
    fileSize: "索引文件大小"
  },
  hardware: {
    saveSuccess: "GPU配置更新成功",
    enable: "开启 GPU",
    capacity: "GPU 缓存容量(GB)",
    search: "用于搜索",
    index: "用于创建索引"
  },
  advanced: {
    saveSuccess: "配置更新成功",
    cacheSetting: "缓存配置",
    capacity: "CPU缓存容量",
    insert: "数据加载到缓存",
    capacityDesc1: "内存中用于驻留搜索数据的缓存空间",
    capacityDesc2:
      "cpu_cache_capacity和 insert_buffer_size (db_config区域）之和不能超过内存总量。",
    insertDesc1: "设置为 true，则新插入的数据会自动加载到缓存以备搜索。",
    insertDesc2: "如果想要实现数据即插即搜索，建议启用该功能。",
    enginSetting: "引擎设置"
  },
  button: {
    cancel: "取消",
    save: "保存",
    update: "更新"
  },
  index: {
    saveSuccess: "索引创建成功"
  }
};
