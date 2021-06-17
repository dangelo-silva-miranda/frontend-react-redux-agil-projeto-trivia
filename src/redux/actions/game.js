import { fetchAPI, QUESTIONS_API } from '../../services/api';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUC = 'REQUEST_QUESTIONS_SUC';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';

// export const requestQuestions = () => ({
//   type: REQUEST_QUESTIONS,
//   payload: {
//   },
// });

export const requestQuestionsSuc = (questions) => ({
  type: REQUEST_QUESTIONS_SUC,
  payload: {
    questions,
  },
});

// export const requestQuestionsError = (error) => ({
//   type: REQUEST_QUESTIONS_ERROR,
//   payload: {
//     error,
//   },
// });

// export const fetchQuestions = (token, questionsNumber) => async (dispatch) => {
//   const endpoint = `${QUESTIONS_API}?amount=${questionsNumber}&token=${token}`;

//   try {
//     const data = await fetchAPI(endpoint);
//     dispatch(requestQuestionsSuc(data.results));
//   } catch (error) {
//     dispatch(requestQuestionsError(error));
//   }
// };

export const fetchQuestions = (token, questionsNumber) => async (dispatch) => {
  const endpoint = `${QUESTIONS_API}?amount=${questionsNumber}&token=${token}`;
  const data = await fetchAPI(endpoint);
  dispatch(requestQuestionsSuc(data.results));
};
