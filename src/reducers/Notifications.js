const initialState = {
  isLoading: false,
  notifications: []
};

const NOTIFICATIONS_SHOW_ALL = 'NOTIFICATIONS_SHOW_ALL';


const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_IS_LOADING':
      console.log('EN NOTIFICATIONS_IS_LOADING!!! ');
      return {
        ...state, 
        isLoading: action.isLoading
      }
    case 'FETCH_NOTIFICATIONS_SUCCESS':
      console.log('EN FETCH_NOTIFICATIONS_SUCCESS!!! ');
      return {
        ...state,
        notifications: action.notifications
      };
    default: return state;
  }
};

export { notificationsReducer };
