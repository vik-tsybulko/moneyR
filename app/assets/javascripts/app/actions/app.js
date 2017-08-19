export function setLoadingState() {
  return {
    type: 'SET_LOADING_STATE'
  }
}

export function unsetLoadingState() {
  return {
    type: 'UNSET_LOADING_STATE'
  }
}

export function alertMessage(message, alert_type) {
  return {
    type: 'ALERT',
    message,
    alert_type
  };
}
