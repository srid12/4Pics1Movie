import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { Container, Content, ListItem, Right, Text, Icon } from 'native-base';

const Industries = ['Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'];

class ListExample extends Component {
  onRowPressed(Industry) {
    Actions.RecogniseMovie({ Industry });
  }
  renderList() {
    return _.map(Industries, Industry => {
      return (
        <ListItem onPress={this.onRowPressed.bind(this, Industry)}>
          <Text>{Industry}</Text>
          <Right>
            <Icon
            ios="ios-arrow-dropright-outline"
            android="md-arrow-dropright"
            />
          </Right>
        </ListItem>
      );
    });
  }
  render() {
        return (
            <Container>
                <Content>
                    {this.renderList()}
                </Content>
            </Container>
        );
    }
}

export default ListExample;
