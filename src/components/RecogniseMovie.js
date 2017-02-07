import _ from 'lodash';
import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageTile from './ImageTile';
import { getMovie, alphabetPressed, deleteAnswerKey, updateStore, updateCoins, addCoins, revealAnswerKey } from '../Actions';
import { CharacterButton, CardSection, Banner, Confirm } from './common';

class RecogniseMovie extends Component {
  constructor() {
  super();
  this.state = { showModal: false };
}
  componentWillMount() {
    this.props.getMovie();
    this.props.updateCoins();
  }
  onLevelUp() {
    this.props.getMovie();
  }
  onHelpRequested() {
    this.setState({ showModal: false });
    this.props.addCoins(-60);
    this.props.revealAnswerKey();
    this.checkAllAnswered();
  }
  onAlphabetPress(id) {
    this.props.alphabetPressed(id);
    this.checkAllAnswered();
  }
  onAnswerKeyPress(characterObj) {
    this.props.deleteAnswerKey(characterObj);
  }
  onDecline() {
    this.setState({ showModal: false });
  }
  checkAllAnswered() {
    const answerFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
    if (answerFilled) {
      const answerString = this.props.answer.map((answerObj) => answerObj.character).join('');
      console.log(answerString);
      if (answerString === _.toUpper(this.props.movie.movieName.replace(/\s/g,''))) {
        this.props.updateStore();
        this.props.addCoins(10);
      } else {
        console.log(' Bad Job');
      }
    }
  }

  renderImageTile() {
    if (_.isEmpty(this.props.movie)) {
      return;
    }
    return <ImageTile cast={this.props.movie.cast} />;
  }

  renderAnswer() {
    if (_.isEmpty(this.props.movie)) {
      return;
    }
    const { answer } = this.props;
      return _.map(answer, (characterObj) => {
        return (
          <CharacterButton
                  key={characterObj.id}
                  character={characterObj.character}
                  disabled={characterObj.character === ''}
                  type
                  onPress={this.onAnswerKeyPress.bind(this, characterObj)}
                  displaySpace={characterObj.hide}
          />
            );
      });
  }

  renderAlphabetsOrBanner() {
    const { alphabets } = this.props;
    if (_.isEmpty(this.props.movie)) {
      return;
    }
    const answerFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' && answerObj.hide);
    if (answerFilled) {
      const answerString = this.props.answer.map((answerObj) => answerObj.character).join('');
      if (answerString === _.toUpper(this.props.movie.movieName.replace(/\s/g, ''))) {
        return <Banner onPress={this.onLevelUp.bind(this)} />;
      }
    }
    return _.map(alphabets, (characterObj) => {
      return (
        <CharacterButton
              key={characterObj.id}
              character={characterObj.character}
              disabled={characterObj.disabled}
              onPress={this.onAlphabetPress.bind(this, characterObj.id)}
        />
         );
    });
  }

  render() {
    return (
        <Image style={styles.ImageContainer}  source={require('./assets/blue.png')}>
        {this.renderImageTile()}

        <CardSection>
          {this.renderAnswer()}
          <TouchableOpacity onPress={() => this.setState({ showModal: !this.state.showModal })}>
            <Icon name="help" size={30} color='green' />
          </TouchableOpacity>
        </CardSection>

        <CardSection style={styles.AlphabetStyle}>
          {this.renderAlphabetsOrBanner()}
        </CardSection>

        <Confirm
        visible={this.state.showModal}
        onAccept={this.onHelpRequested.bind(this)}
        onDecline={this.onDecline.bind(this)}
        >
          Reveal a character for 60 coins?
        </Confirm>
        </Image>
    );
  }
}

const mapStateToProps = ({ movieRecogniser }) => {
  const { movie, alphabets, answer } = movieRecogniser;
  return {
    movie, alphabets, answer
  };
};

const styles = {
  ImageContainer: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  AlphabetStyle: {
    marginTop: 10
  }
};

export default connect(mapStateToProps,
      { getMovie,
        alphabetPressed,
        deleteAnswerKey,
        updateStore,
        updateCoins,
        addCoins,
        revealAnswerKey
       })(RecogniseMovie);
