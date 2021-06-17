import {
  REQUEST_QUESTIONS_SUC,
} from '../actions/game';

import { saveLocalStorage, restoreFromLocalStorage } from '../../functions';

export const keyQuestionsLS = 'questions';

const initialState = {
  questions: restoreFromLocalStorage(keyQuestionsLS),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS_SUC: {
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
