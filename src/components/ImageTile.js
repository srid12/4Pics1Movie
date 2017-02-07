import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import ImageMapper from '../Reducers/mapper.js';
import ResponsiveImageWithFeedback from './ResponsiveImageWithFeedback';

class ImageTile extends Component {
  onImageClick(item) {
    console.log(item);
  }
  render() {
    const { TileStyle } = styles;
    const { cast } = this.props;
    const icon = _.map(cast, (actor) => {
      return ImageMapper[actor];
    });
    return (
      <View style={TileStyle}>
        <View style={{ flexDirection: 'row' }}>
          <ResponsiveImageWithFeedback source={icon[0]} />
          <ResponsiveImageWithFeedback source={icon[1]} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ResponsiveImageWithFeedback source={icon[2]} />
          <ResponsiveImageWithFeedback source={icon[3]} />
        </View>
      </View>
    );
  }
}

const styles = {
  TileStyle: {
    alignItems: 'center',
    marginBottom: 30
  }
};

export default ImageTile;
