import http from '../http-common';

const getAll = () => {
  return http.get('/api/transaction');
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

// const findByName = (name) => {
//   return http.get(`/grade?name=${name}`);
// };

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
