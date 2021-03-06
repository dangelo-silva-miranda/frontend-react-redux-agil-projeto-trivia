import { fetchAPI, TOKEN_API } from '../../services/api';

export const SAVE_NAME_EMAIL_PLAYER = 'SAVE_NAME_EMAIL_PLAYER';

export const saveNameEmailPlayer = (name, email, picture) => ({
  type: SAVE_NAME_EMAIL_PLAYER,
  payload: {
    name,
    email,
    picture,
  },
});

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

// Thunk com Async / Await
export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());

  try {
    const results = await fetchAPI(TOKEN_API);
    dispatch(requestTokenSuccess(results.token));
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

export const ADD_SCORE = 'ADD_SCORE';

export const addScore = (updateScore) => ({
  type: ADD_SCORE,
  payload: {
    updateScore,
  },
});

export const ADD_ASSERTION = 'ADD_ASSERTION';

export const addAssertion = (assertions) => ({
  type: ADD_ASSERTION,
  payload: {
    assertions,
  },
});

export const CLEAR_HISTORY = 'CLEAR_HISTORY';

export const clearHistoryGame = () => ({
  type: CLEAR_HISTORY,
});
