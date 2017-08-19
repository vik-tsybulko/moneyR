import http from './http';

export function login(data) {
  let body = new FormData();
  Object.keys(data).forEach(key => body.append(key, data[key]));
  return http.post({ url: '/sessions', body });
}

export function check() {
  http.get({ url: '/sessions/check' })
    .error(res => {
      location.hash = '#/login';
    })
}

export function logout() {
  http.delete({url: '/sessions'})
    .success(res => {
      location.hash = '#/login';
    })
}
