import { fetchAPI, QUESTIONS_API } from '../../services/api';

// -----------------------------------------------------------------------------------------------
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const requestQuestionsSuc = (questions) => ({
  type: REQUEST_QUESTIONS,
  payload: {
    questions,
  },
});

export const fetchQuestions = (token, questionsNumber) => async (dispatch) => {
  const endpoint = `${QUESTIONS_API}?amount=${questionsNumber}&token=${token}`;
  const data = await fetchAPI(endpoint);
  dispatch(requestQuestionsSuc(data.results));
};

// -----------------------------------------------------------------------------------------------
export const UPDATE_ANSWERS = 'UPDATE_ANSWERS';

export const newAnswers = (updatedAnswers) => ({
  type: UPDATE_ANSWERS,
  payload: {
    updatedAnswers,
  },
});
