let initialState = {
  alert_message: '',
  alert_type: 'success',
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return {
        ...state,
        isLoading: true
      };
    case 'UNSET_LOADING_STATE':
      return {
        ...state,
        isLoading: false
      };

    case 'ALERT':
      return {
        ...state,
        alert_message: action.message,
        alert_type: action.alert_type || state.alert_type
      };

    default:
      return state
  }
}
