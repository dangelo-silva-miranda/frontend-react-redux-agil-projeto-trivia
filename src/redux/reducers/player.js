import toHash from '../../functions/index';
import { SAVE_NAME_EMAIL_PLAYER } from '../actions/player';

const GRAVATAR_API = 'https://www.gravatar.com/avatar/';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
  token: '',
};

export default (state = initialState, { type, payload }) => {
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

  default:
    return state;
  }
};
