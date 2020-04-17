import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {
  Layout,
  Card,
  CardHeader,
  Button,
  CheckBox,
  Input,
} from '@ui-kitten/components';
import {BorderlessInput} from '../components/BorderlessInput';
import {routes} from './routes';

const Header = () => <CardHeader title="I'm deciding:" />;

type DescriptionState = {
  description: string;
  isAddingDescription: boolean;
};

interface Action<T extends string> {
  type: T;
  description?: string;
}

type DescriptionActions =
  | Action<'ADD_DESCRIPTION_CHECKED'>
  | Action<'ADD_DESCRIPTION_UNCHECKED'>
  | Action<'DESCRIPTION_UPDATED'>;

const descriptionReducer = (
  state: DescriptionState,
  action: DescriptionActions,
) => {
  switch (action.type) {
    case 'ADD_DESCRIPTION_CHECKED':
      return {...state, isAddingDescription: true};
    case 'ADD_DESCRIPTION_UNCHECKED':
      return {...state, description: '', isAddingDescription: false};
    case 'DESCRIPTION_UPDATED':
      return {...state, description: action.description || ''};
    default:
      return state;
  }
};

export const DecisionScreen: React.FC<NavigationStackScreenProps> = props => {
  const [title, setTitle] = React.useState<string>();
  const [state, dispatch] = React.useReducer(descriptionReducer, {
    description: '',
    isAddingDescription: false,
  });

  const submit = () => {
    console.log('pressed!', title);
    props.navigation.navigate(routes.choices);
  };

  const Footer = () => (
    <View>
      <Button onPress={submit}>NEXT</Button>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Layout style={styles.container} level="3">
        <Card header={Header} footer={Footer}>
          <Layout style={{paddingVertical: 32}}>
            <BorderlessInput
              placeholder="My next vacation..."
              value={title}
              onChangeText={setTitle}
            />
            <Layout style={{marginTop: 24}}>
              <CheckBox
                text="Add a Description?"
                checked={state.isAddingDescription}
                onChange={nextChecked => {
                  dispatch({
                    type: nextChecked
                      ? 'ADD_DESCRIPTION_CHECKED'
                      : 'ADD_DESCRIPTION_UNCHECKED',
                  });
                }}
              />

              {state.isAddingDescription && (
                <Layout style={{marginTop: 16}}>
                  <Input
                    placeholder="Description"
                    value={state.description}
                    onChangeText={description =>
                      dispatch({type: 'DESCRIPTION_UPDATED', description})
                    }
                    textStyle={{paddingVertical: 8}}
                    multiline
                  />
                </Layout>
              )}
            </Layout>
          </Layout>
        </Card>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});
