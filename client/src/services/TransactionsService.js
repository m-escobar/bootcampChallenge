import http from '../http-common';

const periods = () => {
  return http.get('/api/transaction/periods');
};

const getAll = (data) => {
  return http.get(`api/transaction/all/${data}`);
};

const get = (id) => {
  return http.get(`/api/transaction/${id}`);
};

const create = (data) => {
  return http.post('/api/transaction', data);
};

const update = (id, data) => {
  return http.put(`/api/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

// const findByCategory = (category) => {
//   return http.get(`/transaction?category=${category}`);
// };

export default {
  periods,
  getAll,
  get,
  create,
  update,
  remove,
  // findByCategory
};
