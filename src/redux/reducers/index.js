import { combineReducers } from 'redux';
import player from './player';

const rootReducer = combineReducers({ player });

export default rootReducer;

// store = {
//   player: {
//     name: '',
//     assertions: 0,
//     score: 0,
//     gravatarEmail: '',
//     picture: '',
//     token: '',
//   },
//   game: {
//     questions: [],
//   },
// }
