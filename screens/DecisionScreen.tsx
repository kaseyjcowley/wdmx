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
import {useMachine} from '@xstate/react';
import {BorderlessInput} from '../components/BorderlessInput';
import {routes} from './routes';
import {
  decisionMachine,
  EventType as DecisionEvent,
} from '../machines/decisionMachine';

const Header = () => <CardHeader title="I'm deciding:" />;

export const DecisionScreen: React.FC<NavigationStackScreenProps> = props => {
  const [current, send] = useMachine(decisionMachine);

  const submit = () => {
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
              value={current.context.decision}
              onChangeText={decision => {
                send({type: DecisionEvent.ENTER_DECISION, decision});
              }}
            />
            <Layout style={{marginTop: 24}}>
              <CheckBox
                text="Add a Description?"
                checked={current.context.hasDescription}
                onChange={nextChecked => {
                  send({
                    type: DecisionEvent.TOGGLE_DESCRIPTION,
                    checked: nextChecked,
                  });
                }}
              />

              {current.context.hasDescription && (
                <Layout style={{marginTop: 16}}>
                  <Input
                    placeholder="Description"
                    value={current.context.description ?? ''}
                    onChangeText={description =>
                      send({type: DecisionEvent.ENTER_DESCRIPTION, description})
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
