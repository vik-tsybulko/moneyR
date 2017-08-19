import { store } from '../create_store';
import {
  alertMessage,
  setLoadingState,
  unsetLoadingState
} from '../actions/app';
const { dispatch } = store;

let exec = function(config = {}){
  let callbacks = {
    success: () => {},
    error: () => {},
    start: () => {},
    progress: () => {}
  };

  let xhr = new XMLHttpRequest();
  dispatch(setLoadingState());

  xhr.upload.onprogress = res => callbacks.progress(res.loaded/res.total * 100);
  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) { return }
    let json;
    try { json = JSON.parse(xhr.response) } catch(e) { json = { errors: [e.message] } }

    if (xhr.status.between(200,400)) {
      if (json.message) { dispatch(alertMessage(json.message, 'success')) }
      callbacks.success(json);
    } else {
      callbacks.error(json, xhr.status);
      if(json.errors && json.errors.length > 0){
        dispatch(alertMessage(json.errors[0], 'error'));
      }
      if (xhr.status == 401) { location.href = '#/login' }
    }
    dispatch(unsetLoadingState());
  };
  xhr.open(config.method, config.url, true);
  xhr.setRequestHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content);
  xhr.send(config.body);
  let obj = {
    success: callback => {
      callbacks.success = callback;
      return obj;
    },
    error: callback => {
      callbacks.error = callback;
      return obj;
    },
    progress: callback => {
      callbacks.progress = callback;
      return obj;
    },
    start: callback => {
      callbacks.start = callback;
      return obj;
    }
  };

  return obj;
};

export default {
  exec:   exec,
  get:    config => exec({ ...config, method: 'GET' }),
  post:   config => exec({ ...config, method: 'POST' }),
  put:    config => exec({ ...config, method: 'PUT' }),
  delete: config => exec({ ...config, method: 'DELETE'})
};
