import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import RecogniseMovie from './components/RecogniseMovie';
import IndustryList from './components/IndustryList';

class RouterComponent extends Component {
  render() {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene
        key="languages"
        component={IndustryList}
        title="FilmIndustry"
        initial
      />
     <Scene
      key="RecogniseMovie"
      component={RecogniseMovie}
      title="Find Movies"
      rightTitle="0"
      rightButtonTextStyle={styles.rightTitleStyle}
      rightButtonIconStyle={styles.rightButtonIconStyle}
      rightButtonImage={require('./components/assets/coin.png')}
      onRight={() => console.log('hi')}
     />
    </Router>
  );
}
}

const styles = {
  rightButtonIconStyle: {
    width: 30,
    height: 30,
    marginBottom: 20,
    backgroundColor: 'gold'
  },
  rightTitleStyle: {
    marginRight: 33,
    color: 'gold',
    fontSize: 20,
    fontWeight: '500'
  }
};

export default RouterComponent;
