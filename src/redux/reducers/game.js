import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUC,
  REQUEST_QUESTIONS_ERROR,
} from '../actions/player';

const initialState = {
  questions: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
    };

  case REQUEST_QUESTIONS_SUC: { const { questions } = payload;
    return {
      ...state,
      questions,
    };
  }

  case REQUEST_QUESTIONS_ERROR: { const { error } = payload;
    return {
      ...state,
      error,
    };
  }

  default:
    return state;
  }
};
