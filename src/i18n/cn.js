export default {
  lang: "中文",
  restartNotify: "该页面配置，需要重启Milvus后才会生效",
  submitSuccess: "提交成功",
  disconnect: "是否断开 ",
  notification: {
    restart: {
      title: "配置修改",
      desc: "需要重启后，某些配置才会生效"
    }
  },
  login: {
    host: "主机",
    port: "端口",
    connect: "连接"
  },
  config: {
    title: "配置",
    network: "网络配置",
    storage: "存储路径",
    advanced: "高级配置",
    hardware: "硬件资源",
    metrics: "Metrics"
  },
  dataManage: {
    title: "数据管理",
    table: "表和索引",
    partition: "分区",
    vector: "向量搜索"
  },
  storage: {
    data: {
      primary: "主要路径",
      second: "第二路径",
    },
    metadata: {
      type: "类型",
      host: "主机IP",
      username: "用户名",
      password: "密码",
      port: "端口"
    },
    error: {
      second: "第二路径不能为空"
    }
  },
  network: {
    address: "监听地址",
    port: "监听端口"
  },
  metrics: {
    enable: "启用",
    address: "推送地址",
    port: "推送端口"
  },
  table: {
    create: "新建表",
    index: "更新 Index 表",
    saveSuccess: "表创建成功",
    delete: "删除表成功",
    confirmDel: "是否确认删除表",
    deleteTable: "删除表",
    searchTxt: "请输入表名",
    updateIndex: "更新索引",
    tName: "表名",
    tDimension: "维度",
    tMetric: "Metric 类型",
    tIndex: "索引",
    tAction: "操作",
    fileSize: "索引文件大小 (MB)",
    error: {
      name: "表名是必填项"
    },
    tips: {
      name:
        "要创建的表的名字，由于是表的唯一标识符。表名由字母、下划线、和数字组成。首个字符必须是字母或下划线。总长度必须小于255个字符。",
      fileSize:
        "触发创建索引的阈值。该参数指定只有当原始数据文件大小达到某一阈值，系统才会为其创建索引，默认值为1024 MB。小于该阈值的数据文件不会创建索引。"
    }
  },
  partition: {
    tip: "请根据表名搜索相关分区",
    create: "新建分区",
    saveSuccess: "新建分区成功",
    delete: "删除分区成功",
    confirmDel: "是否确认删除该分区",
    deletePartition: "删除分区",
    searchTxt: "请输入表名",
    tableName: "表名",
    tag: "分区标签",
    name: "分区名",
    action: "操作",
  },
  hardware: {
    saveSuccess: "GPU配置更新成功",
    enable: "开启 GPU",
    capacity: "GPU 缓存容量(GB)",
    search: "用于搜索",
    index: "用于创建索引",
    searchAtLeastOne: "至少需要一个 GPU 用于搜索",
    buildAtLeastOne: "至少需要一个 GPU 用于创建索引",
    cpuVersion: "您的 Milvus 版本为CPU版本。"
  },
  advanced: {
    saveSuccess: "配置更新成功",
    cacheSetting: "缓存配置",
    capacity: "CPU缓存容量",
    insert: "数据加载到缓存",
    blasThreshold: "Blas 阀值",
    gpuThreshold: "GPU 搜索阀值",

    capacityDesc1:
      "内存中用于驻留搜索数据的缓存空间，它与 Insert Buffer Size 之和不能超过内存总量。",
    capacityDesc2:
      "cpu_cache_capacity和 insert_buffer_size (db_config区域）之和不能超过内存总量。",
    insertDesc1:
      "定义是否将新插入的数据自动加载到缓存以备搜索。如果想要实现数据即插即搜索，建议启用该功能。",
    insertDesc2: "如果想要实现数据即插即搜索，建议启用该功能。",
    blasDesc:
      "Milvus 性能调优参数。此参数必须与 nq 比较以确定是否触发使用 OpenBLAS 计算库。如果 nq >= Use Blas Threshold，则使用 OpenBLAS。搜索响应时间无波动，但搜索速度变慢。如果 nq < Use Blas Threshold，搜索速度更快，但搜索响应时间有波动。",
    enginSetting: "引擎设置"
  },

  vector: {
    tName: "表名",
    tTop: "TopK",
    tNprobe: "Nprobe",
    tQuery: "目标向量",

    distance: "距离",
    search: "搜索栏显示",
    tips: {
      tTop: "搜索结果中与要搜索的目标向量相似度最高的 k 条向量。 ",
      tNprobe:
        "查询所涉及的向量类的个数。Nprobe 影响查询精度。数值越大，精度越高，但查询速度更慢。",
      tQuery:
        "要搜索的一条目标向量，必须为浮点数据类型，其维度需要和表中定义的维度一致。"
    }
  },
  button: {
    cancel: "取消",
    save: "保存",
    reset: "重置",
    update: "更新",
    search: "搜索"
  },
  required: " 是必填项",
  index: {
    saveSuccess: "索引创建成功"
  }
};
