import {
  // REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUC,
  // REQUEST_QUESTIONS_ERROR,
} from '../actions/game';

import { saveLocalStorage, restoreFromLocalStorage } from '../../functions';

export const keyQuestionsLS = 'questions';

const initialState = {
  questions: restoreFromLocalStorage(keyQuestionsLS),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  // case REQUEST_QUESTIONS:
  //   return {
  //     ...state,
  //   };

  case REQUEST_QUESTIONS_SUC: {
    const { questions } = payload;
    saveLocalStorage(keyQuestionsLS, questions);
    return {
      ...state,
      questions,
    };
  }

  // case REQUEST_QUESTIONS_ERROR: { const { error } = payload;
  //   return {
  //     ...state,
  //     error,
  //   };
  // }

  default:
    return state;
  }
};
