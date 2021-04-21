import httpRequest from './Axios';

export const uploadUserInfo = async (id,params) => {
  try {
    const res = await httpRequest.put(`/demos/${id}`, params);
    console.log(res)
    return res.data;
  } catch (error) {
    throw error;
  }
};