import {
  REQUEST_QUESTIONS,
} from '../actions/game';

import { saveLocalStorage, restoreFromLocalStorage } from '../../functions';

const keyQuestionsLS = 'questions';

const INITIAL_STATE = {
  questions: restoreFromLocalStorage(keyQuestionsLS),
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

  default:
    return state;
  }
};
