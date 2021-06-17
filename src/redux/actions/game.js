import { fetchAPI, QUESTIONS_API } from '../../services/api';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUC = 'REQUEST_QUESTIONS_SUC';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';

export const requestQuestionsSuc = (questions) => ({
  type: REQUEST_QUESTIONS_SUC,
  payload: {
    questions,
  },
});

export const fetchQuestions = (token, questionsNumber) => async (dispatch) => {
  const endpoint = `${QUESTIONS_API}?amount=${questionsNumber}&token=${token}`;
  const data = await fetchAPI(endpoint);
  dispatch(requestQuestionsSuc(data.results));
};

export const UPDATE_TIME = 'UPDATE_TIME';
export const STOP_TIME = 'STOP_TIME';

export const updateTime = (time) => ({
  type: UPDATE_TIME,
  payload: {
    time,
  },
});

export const stopTime = () => ({
  type: STOP_TIME,
});
