
const url = 'https://api.github.com/notifications?all=true';

const headers = {
  headers: {
    'Authorization': 'token 952f0e7be254e499c616e6e4eb2796c409bca81e'
  }
};


export function showAll () {
  return dispatch => {
    dispatch(isFetchingNotifications(true));
    return fetch(url, headers)
      .then((response) => {

        return response.json();
      })
      .then((responseJson) => {
        dispatch(isFetchingNotifications(false));
        dispatch(fetchNotificationsSuccess(responseJson));
      })
  }

};


export const isFetchingNotifications = (bool) => {
  return {
    type: 'NOTIFICATIONS_IS_LOADING',
    isLoading: bool
  };
}


export const fetchNotificationsSuccess = (notifications) => {
  //console.log('BUSQUEDA FINALIZADA CON EXITO!! ' + JSON.stringify(notifications,null,1));
  return {
    type: 'FETCH_NOTIFICATIONS_SUCCESS',
    notifications
  }
};


//export { showAll };
