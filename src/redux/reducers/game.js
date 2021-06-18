import {
  REQUEST_QUESTIONS_SUC,
  UPDATE_TIME,
  STOP_TIME,
} from '../actions/game';

import { saveLocalStorage, restoreFromLocalStorage } from '../../functions';

const keyQuestionsLS = 'questions';

const INITIAL_STATE = {
  questions: restoreFromLocalStorage(keyQuestionsLS),
  time: 30,
  stopTime: 30,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS_SUC: {
    const { questions } = payload;
    saveLocalStorage(keyQuestionsLS, questions);
    return {
      ...state,
      questions,
    };
  }

  case UPDATE_TIME: {
    const { time } = payload;
    return {
      ...state,
      time,
    };
  }

  case STOP_TIME: {
    const { stopTime } = payload;
    return {
      ...state,
      stopTime,
    };
  }

  default:
    return state;
  }
};
