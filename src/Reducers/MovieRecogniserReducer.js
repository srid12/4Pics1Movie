import _ from 'lodash';
import { GET_MOVIE,
        ALPHABET_PRESSED,
        DELETE_ANSWER_KEY,
        REVEAL_ANSWER_KEY
     } from '../Actions/types';
import MovieList from './MovieList.json';

const ALPHABETS_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIE: {
      const movie = _.toUpper(MovieList[action.payload].movieName).split('');
      let alphabets = [];
      let z = [];
      if (movie.length <= 15) {
        const requiredLength = 20 - movie.length;
        z = _.sampleSize(ALPHABETS_LIST, requiredLength);
      }
      const movieWithoutSpaces = _.filter(movie, (character) => character !== ' ');
      alphabets = _.concat(alphabets, movieWithoutSpaces, z);
      alphabets = _.shuffle(alphabets);
      alphabets = _.map(alphabets, (character, i) => {
        return {
          id: i,
          disabled: false,
          character
        };
      });
      const answer = _.map(movie, (character, i) => {
        return {
          pos: i,
          character: '',
          hide: character === ' '
        };
      });
      return { movie: MovieList[action.payload], alphabets, answer };
  }

    case ALPHABET_PRESSED: {
      const id = action.payload;
      const alphabets = _.map(state.alphabets, (alphabet) => {
        if (alphabet.id === id) {
          return { ...alphabet, disabled: true };
        }
        return alphabet;
      });
      const alphabetPressed = _.find(alphabets, { id }).character;
      const insertAnswer = _.find(state.answer, (i) => { return i.character === '' && !i.hide; });
      insertAnswer.character = alphabetPressed;
      const answer = [...state.answer];
      return { ...state, alphabets, answer };
    }

    case DELETE_ANSWER_KEY: {
      const character = action.payload;
      const deleteAnswer = _.find(state.answer, (i) => { return i.character === character; });
      deleteAnswer.character = '';
      const answer = [...state.answer];
      const alphabetEnabled = _.find(state.alphabets, (i) => {
         return i.character === character && i.disabled;
       });
      alphabetEnabled.disabled = false;
      const alphabets = [...state.alphabets];
      return { ...state, alphabets, answer };
    }

    case REVEAL_ANSWER_KEY: {
      const toBeFilled = _.filter(state.answer, i => i.character === '');
      const randomKey = _.sample(toBeFilled).pos;
      console.log('randomKey', _.sample(toBeFilled));
      const RevealingCharacter = _.find(state.answer, i => i.pos === randomKey);
      const RevealedCharacter = _.toUpper(state.movie.movieName.trim().charAt(randomKey));
      RevealingCharacter.character = RevealedCharacter;
      const answer = [...state.answer];
      const alphabetButton = _.find(state.alphabets, i => !i.disabled && i.character === RevealedCharacter);
      alphabetButton.disabled = true;
      const alphabets = [...state.alphabets];
      return { ...state, answer, alphabets };
    }

    default:
      return state;
  }
};
