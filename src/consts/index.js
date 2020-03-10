export const HOST = "milvusHost";

export const PORT = "milvusPort";

export const LOG_SERVER = 'logServer';

export const PM_SERVER = 'pmServer';

export const CLIENT_HISTORY = 'clientHistory'

// reducer actions
export const ADD = "add"
export const DISCONNECT = "disconnect"
export const UPDATE = "update"
export const INIT = "init"
export const DELETE = "delete"
export const DELETE_MUTIPLE = "delete_mutiple"

// url query
export const PARTITION_TAG = 'partitionTag'
export const COLLECTION_NAME = 'collectionName'

// index 
export const INDEX_CONFIG = {
  IVFFLAT: {
    create: ["nlist"],
    search: ["nprobe"]
  },
  IVFPQ: {
    create: ["nlist", "m"],
    search: ["nprobe"]
  },
  IVFSQ8: {
    create: ["nlist"],
    search: ["nprobe"]
  },
  IVFSQ8H: {
    create: ["nlist"],
    search: ["nprobe"]
  },
  FLAT: {
    create: ["nlist"],
    search: ["nprobe"]
  },
  HNSW: {
    create: ["M", "efConstruction"],
    search: ["ef"]
  },
}

export const INDEX_CREATES = ["nlist", "m", "M", "efConstruction"]