import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';

class ResponsiveImageWithFeedback extends Component {
  render() {
    const { source } = this.props;
    return (
      <TouchableWithoutFeedback >
        <ResponsiveImage
          style={styles.ImageStyles}
          source={source}
          initWidth="180"
          initHeight="180"
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  ImageStyles: {
    margin: 3,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 4
  }
};

export default ResponsiveImageWithFeedback;
