import http from './http';

export function getFlags() {
  return http.get({url:'/country_flags.json'})
}