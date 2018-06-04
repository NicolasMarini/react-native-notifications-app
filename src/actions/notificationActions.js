
const url = 'https://api.github.com/notifications?all=true';

const headers = {
  headers: {
    'Authorization': 'token 46fd5e34b30420b16a905b70898e7d74c78e1a29'
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
