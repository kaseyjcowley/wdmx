import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, StatusBar} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {FactorImportanceSlider} from '../components/FactorImportanceSlider';

interface Props {}

export const Scoring: React.FC<Props> = props => {
  const viewPager = React.useRef(null);

  const factors = ['Factor 1', 'Factor 2', 'Factor 3', 'Factor 4'];

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <ViewPager
        ref={viewPager}
        initialPage={0}
        scrollEnabled={false}
        style={{flex: 1}}>
        <Layout
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text category="h1">Choice: Seattle</Text>
          <Text category="p1" style={{textAlign: 'center', fontSize: 20}}>
            On a scale from 1 to 5,{'\n'}how important is:
          </Text>
          <Layout style={{marginTop: 16}}>
            {factors.map(factor => (
              <Layout key={factor} style={{marginBottom: 16}}>
                <FactorImportanceSlider factor={factor} />
              </Layout>
            ))}
          </Layout>
        </Layout>
      </ViewPager>
    </SafeAreaView>
  );
};
