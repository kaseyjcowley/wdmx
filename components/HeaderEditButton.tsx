import React from 'react';
import {View, Button} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackScreenProps['navigation'];
}

export const HeaderEditButton: React.FC<Props> = ({navigation}) => {
  const {
    toggleEditing,
    isEditing,
    isDisabled,
  } = navigation.state.params ?? {};

  return (
    <View style={{marginRight: 10}}>
      <Button
        onPress={toggleEditing}
        title={isEditing && !isDisabled ? 'Done' : 'Edit'}
        disabled={isDisabled}
      />
    </View>
  );
}