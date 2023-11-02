import http from 'src/utils/http';

const controller = new AbortController();

export const getListUsers = () => {
  return http.get('users', { signal: controller.signal });
};
export const postRegisterUser = (body) => {
  return http.post('users', body, { signal: controller.signal });
};
