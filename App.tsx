/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {SelectChoicesScreen} from './screens/SelectChoicesScreen';
import {FactorsSelectionScreen} from './screens/FactorsSelectionScreen';
import {DecisionScreen} from './screens/DecisionScreen';
import {ScoringInstructions} from './screens/ScoringInstructions';

const StepsNavigator = createStackNavigator({
  decision: {
    screen: DecisionScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  choices: {
    screen: SelectChoicesScreen,
    navigationOptions: {
      title: 'What are the Choices?',
      headerBackTitle: 'Back',
    },
  },
  criteria: {
    screen: FactorsSelectionScreen,
    navigationOptions: {
      title: 'What are the Factors?',
    },
  },
});

const AppNavigator = createSwitchNavigator(
  {
    steps: {
      screen: StepsNavigator,
    },

    scoringInstructions: {
      screen: ScoringInstructions,
    },
  },
  {
    initialRouteName: 'scoringInstructions',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppContainer />
      </ApplicationProvider>
    </React.Fragment>
  );
}
