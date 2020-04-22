import React from 'react';
import * as R from 'ramda';
import {Button, Card, CardHeader, Input, Layout} from '@ui-kitten/components';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {DeleteRowWrapper} from '../components/DeleteRowWrapper';
import {Stepper} from '../components/Stepper';
import {getOrdinalFor} from '../utils/oridinals';
import {HeaderEditButton} from '../components/HeaderEditButton';

interface Props extends NavigationStackScreenProps {}

type FactorWeightPair = [string, number];

const Header = () => (
  <CardHeader title="Step 3." description="What are the factors?" />
);

const EMPTY_PAIR: FactorWeightPair = ['', 1];

export function FactorsSelectionScreen(props: Props) {
  const [pairs, setPairs] = React.useState<FactorWeightPair[]>([EMPTY_PAIR]);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const setFactorAt = (index: number, factor: string) => {
    setPairs(p => {
      const newPair = [factor, p[index][1]];
      const lens = R.lensIndex(index);
      return R.set(lens, newPair, p);
    });
  };

  const setWeightAt = (index: number, weight: number) => {
    setPairs(p => {
      const newPair = [p[index][0], weight];
      const lens = R.lensIndex(index);
      return R.set(lens, newPair, p);
    });
  };

  const appendPair = () => setPairs(pairs.concat([EMPTY_PAIR]));

  const deletePairAt = (index: number) => {
    setPairs(p => {
      const newPairs = [...p];
      newPairs.splice(index, 1);
      return newPairs;
    });
  };

  React.useEffect(() => {
    props.navigation.setParams({
      isEditing,
      isDisabled: pairs.length === 1,
      toggleEditing: setIsEditing.bind(null, !isEditing),
    });
  }, [isEditing, pairs.length]);

  const Footer = () => (
    <Layout>
      <Button onPress={() => props.navigation.navigate('scoringInstructions')}>
        NEXT
      </Button>
    </Layout>
  );

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" />
      <Layout style={[styles.fill, {padding: 16}]} level="3">
        <Card header={Header} footer={Footer}>
          {pairs.map(([factor, weight], index) => (
            <DeleteRowWrapper
              key={index}
              showDeleteControls={isEditing && index >= 2}
              onDeleteRow={() => deletePairAt(index)}>
              <Input
                style={[styles.fill, {marginRight: 16}]}
                placeholder={`${getOrdinalFor(index + 1)} Factor`}
                value={factor}
                onChangeText={factor => setFactorAt(index, factor)}
              />
              <Stepper
                min={1}
                max={5}
                value={weight}
                onChange={weight => setWeightAt(index, weight)}
              />
            </DeleteRowWrapper>
          ))}
          <Layout style={styles.rowReverse}>
            <Button
              appearance="ghost"
              onPress={appendPair}
              disabled={pairs.length >= 5}>
              + Add Factor
            </Button>
          </Layout>
        </Card>
      </Layout>
    </SafeAreaView>
  );
}

FactorsSelectionScreen.navigationOptions = ({
  navigation,
}: NavigationStackScreenProps) => ({
  headerRight: () => <HeaderEditButton navigation={navigation} />,
});

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
});
