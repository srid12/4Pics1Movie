import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CharacterButton = (
    { disabled,
      character,
       onPress,
        id,
         displaySpace,
         type
        }) => {
  const { textStyle, textStyleDisabled } = styles;
  return (
    <TouchableOpacity
      key={id}
      style={buttonStyle(disabled, displaySpace, type)}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={disabled ? textStyleDisabled : textStyle}
      >{character}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = (disabled, displaySpace, type) => {
  const z = {
              width: 35,
              height: 35,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#007aff'
          };
  if (displaySpace) {
    z.borderColor = 'rgba(0, 0, 0, 0)';
    z.backgroundColor = 'rgba(0, 0, 0, 0)';
    return z;
  }
  if (disabled && !type) {
    z.backgroundColor = '#999';
  } else {
    z.backgroundColor = '#fff';
  }
  return z;
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 2
  },
  textStyleDisabled: {
    alignSelf: 'center',
    color: 'rgb(107, 138, 161)',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 2
  },
  buttonStyle: {
    opacity: 1,
    width: 35,
    height: 35,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  }
};

export { CharacterButton };
