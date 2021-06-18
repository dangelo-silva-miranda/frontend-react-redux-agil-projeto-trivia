import {
  SAVE_NAME_EMAIL_PLAYER,
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
} from '../actions/player';

import { saveLocalStorage, toHash } from '../../functions';
import { GRAVATAR_API } from '../../services/api';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
  token: '',
  isFetching: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_NAME_EMAIL_PLAYER: {
    const { name, email } = payload;
    const hash = toHash(email);
    const picture = `${GRAVATAR_API}${hash}`;

    return {
      ...state,
      name,
      gravatarEmail: email,
      picture,
    };
  }

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
