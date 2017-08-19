import http from './http';

export function all(filters) {
  let url = '/admins.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}
export function upsert(model = {}){
  let body = new FormData();

  body.append('email', model.email || '' );
  if (model.password) body.append('password', model.password);
  if (model.password_confirmation) body.append('password_confirmation', model.password_confirmation);

  if(model.id){
    return http.put({ url:`/admins/${model.id}`, body })
  }else{
    return http.post({ url:'/admins', body })
  }
}

export function show(id){
  return http.get({url:`/admins/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admins/${id}`})
}