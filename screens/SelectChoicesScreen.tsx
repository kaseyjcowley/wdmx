import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Input, Card, CardHeader, Button, Layout} from '@ui-kitten/components';
import {getOrdinalFor} from '../utils/oridinals';
import {routes} from './routes';
import {DeleteRowWrapper} from '../components/DeleteRowWrapper';
import {HeaderEditButton} from '../components/HeaderEditButton';

interface Props extends NavigationStackScreenProps {}

const EMPTY_CHOICE = '';

export function SelectChoicesScreen(props: Props) {
  const [choices, setChoices] = React.useState<string[]>([
    EMPTY_CHOICE,
    EMPTY_CHOICE,
  ]);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.navigation.setParams({
      isEditing,
      isDisabled: choices.length === 2,
      toggleEditing: setIsEditing.bind(null, !isEditing),
    });
  }, [isEditing, choices.length]);

  const updateChoice = React.useCallback(
    (index: number, value: string) => {
      const newChoices = [...choices];
      newChoices[index] = value;
      setChoices(newChoices);
    },
    [choices],
  );

  const appendChoice = React.useCallback(() => {
    setChoices(choices.concat(EMPTY_CHOICE));
  }, [choices]);

  const removeChoice = React.useCallback(
    (index: number) => {
      setChoices([...choices.slice(0, index), ...choices.slice(index + 1)]);
    },
    [choices],
  );

  const submit = () => {
    props.navigation.navigate(routes.criteria);
  };

  const Footer = () => (
    <Layout>
      <Button onPress={submit}>NEXT</Button>
    </Layout>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Layout style={styles.container} level="3">
        <Card header={Header} footer={Footer}>
          {choices.map((choice, i) => (
            <DeleteRowWrapper
              key={`choice_${i}`}
              style={styles.inputContainer}
              showDeleteControls={isEditing && choices.length > 2}
              onDeleteRow={() => removeChoice(i)}>
              <Input
                style={styles.input}
                placeholder={`${getOrdinalFor(i + 1)} Choice`}
                value={choice}
                onChangeText={text => updateChoice(i, text)}
              />
            </DeleteRowWrapper>
          ))}
          <Layout style={{flexDirection: 'row-reverse'}}>
            <Button
              appearance="ghost"
              onPress={appendChoice}
              disabled={choices.length >= 5}>
              + Add Choice
            </Button>
          </Layout>
        </Card>
      </Layout>
    </SafeAreaView>
  );
}

SelectChoicesScreen.navigationOptions = ({
  navigation,
}: NavigationStackScreenProps) => ({
  headerRight: () => <HeaderEditButton navigation={navigation} />,
});

const Header = () => (
  <CardHeader
    title="Step 1."
    description="What are the choices? At least two are required."
  />
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
});
