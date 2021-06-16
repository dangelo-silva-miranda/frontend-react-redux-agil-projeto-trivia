import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
} from '../actions/player';

import { saveLocalStorage } from '../../functions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
  token: '',
  isFetching: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case REQUEST_TOKEN: { const { isFetching } = payload;
    return {
      ...state,
      isFetching,
    };
  }

  case REQUEST_TOKEN_SUCCESS: {
    const { isFetching, token } = payload;
    const key = 'token';
    saveLocalStorage(key, token);
    return {
      ...state,
      token,
      isFetching,
    };
  }

  case REQUEST_TOKEN_ERROR: { const { isFetching, error } = payload;
    return {
      ...state,
      error,
      isFetching,
    };
  }

  default:
    return state;
  }
};
