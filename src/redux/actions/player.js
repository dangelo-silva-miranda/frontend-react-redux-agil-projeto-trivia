import { fetchAPI, TOKEN_API, QUESTIONS_API } from '../../services/api';

export const SAVE_NAME_EMAIL_PLAYER = 'SAVE_NAME_EMAIL_PLAYER';

export const saveNameEmailPlayer = (name, email) => ({
  type: SAVE_NAME_EMAIL_PLAYER,
  payload: {
    name,
    email,
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

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';

export const requestQuestions = (questions) => ({
  type: REQUEST_QUESTIONS,
  payload: {
    questions,
  },
});

export const requestQuestionsError = (error) => ({
  type: REQUEST_QUESTIONS_ERROR,
  payload: {
    error,
  },
});

export const fetchQuestions = (token, questionsNumber) => async (dispatch) => {
  const endpoint = `${QUESTIONS_API}?amount=${questionsNumber}&token=${token}`;
  dispatch(requestQuestions());

  try {
    const data = await fetchAPI(endpoint);
    dispatch(requestQuestions(data.results));
  } catch (error) {
    dispatch(requestQuestionsError(error));
  }
};
