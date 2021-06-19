import {
  SAVE_NAME_EMAIL_PLAYER,
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
  ADD_SCORE,
} from '../actions/player';

import { restoreFromLocalStorage, saveLocalStorage } from '../../functions';

const { player } = restoreFromLocalStorage('state');

const INITIAL_STATE = {
  name: (player) ? player.name : '',
  score: 0,
  gravatarEmail: (player) ? player.gravatarEmail : '',
  picture: (player) ? player.picture : '',
  token: restoreFromLocalStorage('token'),
  isFetching: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_NAME_EMAIL_PLAYER: { const { name, email, picture } = payload;
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
  case REQUEST_TOKEN_SUCCESS: { const { isFetching, token } = payload;
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
  case ADD_SCORE: { const { updateScore } = payload;
    return {
      ...state,
      score: updateScore,
    };
  }
  default:
    return state;
  }
};
