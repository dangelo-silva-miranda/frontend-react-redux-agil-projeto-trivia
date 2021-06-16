import fetchAPI from '../../services/api';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
  payload: {
    isFetching: true,
  },
});

export const requestTokenSuccess = (token) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload: {
    token,
    isFetching: false,
  },
});

export const requestTokenError = (error) => ({
  type: REQUEST_TOKEN_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

// Thunk com Async / Await
export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());

  try {
    const results = await fetchAPI(TOKEN_API);
    dispatch(requestTokenSuccess(results));
  } catch (error) {
    dispatch(requestTokenError(error));
  }
};

// Thunk com Then
// export const fetchToken = () => (dispatch) => {
//   dispatch(requestToken());
//   fetchAPI(TOKEN_API)
//     .then((tokenSuccess) => dispatch(
//       requestTokenSuccess(tokenSuccess),
//     ))
//     .catch((tokenError) => dispatch(
//       requestTokenError(tokenError),
//     ));
// };
