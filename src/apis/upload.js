import axios from 'axios';

export const getToken = (query) => {
  return axios({
    url: "/up/getToken",
    method: 'get',
    params: query
  })
};

export const uploadQiNiu = (query) => {
  return axios({
    url: 'https://upload-z2.qiniup.com',
    method: 'post',
    data: query
  })
};