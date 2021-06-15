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
  case typeName:
    return { ...state, ...payload };

  default:
    return state;
  }
};
