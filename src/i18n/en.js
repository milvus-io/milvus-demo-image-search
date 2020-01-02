export default {
  lang: "en",
  config: {
    title: "Configuration",
    advanced: "Advanced Settings",
    hardware: "Hardware Resources"
  },
  dataManage: {
    title: "Data Management",
    table: "Table and Index",
    vector: "Vector Search"
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
    fileSize: "Index File Size",
    error: {
      name: "Table Name is required"
    }
  },
  hardware: {
    saveSuccess: "Save Gpu Configs Success",
    enable: "Enable GPU",
    capacity: "GPU Cache Capacity (GB)",
    search: "Enabled For Searching",
    index: "Enabled For Building Index",
    searchAtLeastOne: "Need at least one GPU for searching",
    buildAtLeastOne: "Need at least one GPU for building index"
  },
  advanced: {
    saveSuccess: "Update Configs Success",
    cacheSetting: "Caches Setting",
    capacity: "CPU Cache Capacity",
    insert: "Cache Insert Data",
    blasThreshold: "use blas threshold",
    gpuThreshold: "GPU search threshold",
    capacityDesc1:
      "The size of the CPU memory for caching data for faster query. ",
    capacityDesc2:
      "The sum of cpu_cache_capacity and insert_buffer_size (in Section db_config) mustbe less than total CPU memory size.",
    insertDesc1:
      "If set to true , the inserted data will be loaded into the cache immediately for hot query.",
    insertDesc2:
      "If you want simultaneous inserting and searching of vector, it is recommended to enable this function.",
    enginSetting: "Engine Setting"
  },
  vector: {
    tName: "Table Name",
    tTop: "TopK",
    tNprobe: "Nprobe",
    tQuery: "Query Records",
    queryPlace:
      "One vector to be searched in the table. Each vector value must be float data type, with the same dimension as that defined for the table.Example: [0.1, 0.2,2,3 ...]",
    distance: "distance",
    search: "Search Vector"
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
