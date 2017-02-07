import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
        {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
