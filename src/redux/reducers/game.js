import {
  REQUEST_QUESTIONS,
  UPDATE_ANSWERS,
  SET_QUESTIONS_NUMBER,
  QUESTIONS_NUMBER_DEFAULT,
} from '../actions/game';

import { saveLocalStorage, restoreFromLocalStorage } from '../../functions';

const keyQuestionsLS = 'questions';

const INITIAL_STATE = {
  questions: restoreFromLocalStorage(keyQuestionsLS),
  updatedAnswers: true,
  questionsNumber: QUESTIONS_NUMBER_DEFAULT,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS: {
    const { questions } = payload;
    saveLocalStorage(keyQuestionsLS, questions);
    return {
      ...state,
      questions,
    };
  }

  case UPDATE_ANSWERS: {
    const { updatedAnswers } = payload;
    return {
      ...state,
      updatedAnswers,
    };
  }

  case SET_QUESTIONS_NUMBER: {
    const { questionsNumber } = payload;
    return {
      ...state,
      questionsNumber,
    };
  }

  default:
    return state;
  }
};
