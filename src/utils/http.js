import axios from "axios";

const api = "";

let hasError = false;

const instance = axios.create({
  timeout: 20000,
  headers: {
    "Content-Type": "applycation/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.data && res.data.code === 400) {
      // openSnackBar(res.data.data.msg, "error", 2000);
      return res;
    }
    return res;
  },
  (error) => {
    if (hasError) {
      return Promise.reject(error);
    }
    if (error.response && error.response.data) {
      const { message: errMsg } = error.response.data;
      // errMsg && openSnackBar(errMsg, "error", 2000);
      hasError = true;
      setTimeout(() => {
        hasError = false;
      }, 2000);
      return Promise.reject(error);
    }
    if (error.message) {
      hasError = true;
      setTimeout(() => {
        hasError = false;
      }, 2000);
      // openSnackBar(error.message, "error", 2000);
    }
    return Promise.reject(error);
  }
);

export const search = async (formData) => {
  const res = await instance.post(
    `http://40.117.75.127:5004/api/v1/search`,
    formData
  );
  return res.data;
};

export async function getCount() {
  const res = await instance.post(`http://40.117.75.127:5004/api/v1/count`);
  return res.data;
}

export const uploadUserInfo = async (param) => {
  try {
    const res = await instance.put(
      `http://40.117.75.127:5005/demos/${param.id}`,
      param.params
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
