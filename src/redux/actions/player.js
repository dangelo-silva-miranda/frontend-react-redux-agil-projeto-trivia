export const SAVE_NAME_EMAIL_PLAYER = 'SAVE_NAME_EMAIL_PLAYER';

const saveNameEmailPlayerAction = (name, email) => ({
  type: SAVE_NAME_EMAIL_PLAYER,
  payload: {
    name,
    email,
  },
});

export default saveNameEmailPlayerAction;
