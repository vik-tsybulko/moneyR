import http from './http';

export function update(data) {
  let body = new FormData();
  body.append('address', data.address || '');
  body.append('port', data.port || '');
  body.append('domain', data.domain || '');
  body.append('authentication', data.authentication || '');
  body.append('user_name', data.user_name || '');
  if (data.password) body.append('password', data.password);
  body.append('enable_starttls_auto', data.enable_starttls_auto);
  return http.put({ url: '/email_sender', body });
}

export function show() {
  return http.get({ url: '/email_sender' })
}
