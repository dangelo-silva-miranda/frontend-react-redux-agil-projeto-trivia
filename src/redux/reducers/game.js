import {
  REQUEST_QUESTIONS,
  UPDATE_ANSWERS,
} from '../actions/game';

import { saveLocalStorage, restoreFromLocalStorage } from '../../functions';

const keyQuestionsLS = 'questions';

const INITIAL_STATE = {
  questions: restoreFromLocalStorage(keyQuestionsLS),
  updatedAnswers: true,
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

  default:
    return state;
  }
};
