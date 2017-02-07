import React from 'react';
import { View } from 'react-native';
import { Header } from './Header';
import { Button } from './Button';
import { CardSection } from './CardSection';

const Banner = ({ onPress }) => {
  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Header headerText='Good Job' />
      <CardSection>
      <Button onPress={onPress}> Next Movie </Button>
      </CardSection>
    </View>
  );
};

export { Banner };
