export default {
  lang: "en",
  restartNotify: "Config will become effective after milvus restart. ",
  notification: {
    restart: {
      title: "Config Changed",
      desc: "Config will become effective after milvus restart."
    }
  },
  login: {
    host: "Host",
    port: "Port",
    connect: "Connect"
  },
  config: {
    title: "Configuration",
    network: "Network Access",
    storage: "Storage Path",
    advanced: "Advanced Settings",
    hardware: "Hardware Resources"
  },
  dataManage: {
    title: "Data Management",
    table: "Table and Index",
    vector: "Vector Search"
  },
  storage: {
    primary: "Primary Path",
    second: "Secondary Path",
    metaData: "Meta Data Database",
    metric: "Metric Collection"
  },
  network: {
    address: "Listening Address",
    port: "Listening Port"
  },
  table: {
    create: "New Table",
    index: "Update Index for",
    saveSuccess: "Create Table Success",
    delete: "Delete Table Success",
    confirmDel: "Are you sure to delete table",
    deleteTable: "Delete Table",
    searchTxt: "Table Name",
    updateIndex: "Update Index",
    tName: "Name",
    tDimension: "Dimension",
    tMetric: "Metric Type",
    tIndex: "Index",
    tAction: "Action",
    fileSize: "Index File Size (MB)",
    error: {
      name: "Table Name is required"
    },
    tips: {
      name:
        "The name of the table to create, which must be unique within its database. Begin a table name with a letter or an underscore (_) . Subsequent characters can be letters, underscores, numbers (0-9). The entire length can not exceed 255 characters.",
      fileSize:
        "Threshold value that triggers index building for raw data files. Index creation is controlled by the size of raw data files specified in this parameter, with a default of 1024 MB. Data files with smaller sizes will not have indexes built. "
    }
  },
  hardware: {
    saveSuccess: "Save Gpu Configs Success",
    enable: "Enable GPU",
    capacity: "GPU Cache Capacity (GB)",
    search: "Enabled for Searching",
    index: "Enabled for Building Index",
    searchAtLeastOne: "Need at least one GPU for searching",
    buildAtLeastOne: "Need at least one GPU for building index",
    cpuVersion: "Your milvus version is CPU version."
  },
  advanced: {
    saveSuccess: "Update Configs Success",
    cacheSetting: "Caches ",
    capacity: "CPU Cache Capacity",
    insert: "Cache Insert Data",
    blasThreshold: "Use Blas Threshold",
    gpuThreshold: "GPU search threshold",
    capacityDesc1:
      "The size of CPU memory used for caching data for faster query. The sum of CPU Cache Capacity and Insert Buffer Size must be less than system memory size. ",
    capacityDesc2:
      "The sum of cpu_cache_capacity and insert_buffer_size (in Section db_config) mustbe less than total CPU memory size.",
    insertDesc1:
      "Whether to load inserted data into cache immediately for hot query. If you want to simultaneously insert and query vectors, it's recommended to enable this function. ",
    insertDesc2:
      "If you want simultaneous inserting and searching of vector, it is recommended to enable this function.",
    blasDesc:
      "A Milvus performance tuning parameter. This value will be compared with 'nq' (the number of query vectors) to decide if OpenBLAS should be used. If nq >= Use Blas Threshold, OpenBLAS will be used. Search response times will be stable but the search speed will be slower; if nq < Use Blas Threshold, SSE will be used. The search speed will be faster but search response times will fluctuate. ",
    engin: "Engine "
  },
  vector: {
    tName: "Table Name",
    tTop: "TopK",
    tNprobe: "Nprobe",
    tQuery: "Query Vector",
    distance: "Distance",
    search: "Search Vector",
    tips: {
      tTop: "The top k most similar results of each query vector. ",
      tNprobe:
        "Number of queried vector buckets. Nprobe affects search precision. The greater the value, the more precise the result, yet the slower the search speed.",
      tQuery:
        "One target vector to be searched in the table. It must be the float data type, with the same dimension as that defined for the table."
    }
  },
  button: {
    cancel: "Cancel",
    save: "Save",
    reset: "Reset",
    update: "Update",
    search: "Search"
  },
  required: " is required",
  index: {
    saveSuccess: "Create Index Success"
  }
};
