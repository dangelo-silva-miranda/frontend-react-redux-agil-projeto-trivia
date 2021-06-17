import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_ERROR,
} from '../actions/player';

const initialState = {
  questions: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS: { const { questions } = payload;
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
