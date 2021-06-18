import {
  REQUEST_QUESTIONS_SUC,
  UPDATE_TIME,
  TIME_STOPPED,
} from '../actions/game';

import { saveLocalStorage, restoreFromLocalStorage } from '../../functions';

const keyQuestionsLS = 'questions';

const INITIAL_STATE = {
  questions: restoreFromLocalStorage(keyQuestionsLS),
  time: 30,
  timeStopped: null,
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

  case TIME_STOPPED: {
    const { timeStopped } = payload;
    return {
      ...state,
      timeStopped,
    };
  }

  // case STOP_TIME: {

  //   return {
  //     ...state,
  //   };
  // }

  default:
    return state;
  }
};
