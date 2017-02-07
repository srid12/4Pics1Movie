import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { GET_MOVIE, ALPHABET_PRESSED, DELETE_ANSWER_KEY } from './types';

export const getMovie = () => {
  return (dispatch) => {
    store.get('movie')
      .then(data => {
        dispatch({
          type: GET_MOVIE,
          payload: data.qNo
        });
      })
      .catch(() => store.save('movie', { qNo: 0 })
        .then(() => dispatch({
          type: GET_MOVIE,
          payload: 0
        })));
  };
};

export const alphabetPressed = (id) => {
  return {
    type: ALPHABET_PRESSED,
    payload: id
  };
};

export const deleteAnswerKey = ({ character }) => {
  return {
    type: DELETE_ANSWER_KEY,
    payload: character
  };
};

export const updateStore = () => {
  let qNo = 0;
  return (dispatch) => {
    store.get('movie').then(data => {
      qNo = data.qNo + 1;
      store.update('movie', { qNo }).then(() => {
      });
    });
  };
};

export const addCoins = (amount) => {
  let coins = 0;
  return () => {
    store.get('coins').then(data => {
      coins = data.coins + amount;
      store.update('coins', { coins });
      Actions.refresh({ rightTitle: `${coins}` });
    });
  };
};

export const updateCoins = () => {
  return () => {
    store.get('coins')
    .then(data => {
      Actions.refresh({ rightTitle: `${data.coins}` });
    })
    .catch(() => store.save('coins', { coins: 0 })
    .then(() => Actions.refresh({ rightTitle: '0' })
  ));
};
};

export const revealAnswerKey = () => {
  return {
    type: 'REVEAL_ANSWER_KEY'
  };
};
