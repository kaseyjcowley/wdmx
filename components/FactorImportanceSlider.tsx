import React from 'react';
import {Icon as UIKittenIcon, Text, Layout} from '@ui-kitten/components';
import RNSlider from '@react-native-community/slider';
import styled from 'styled-components/native';

const ToolTip = styled.View<{value: number}>`
  background-color: red;
  height: 23px;
  width: 25px;
  position: absolute;
  left: ${props => props.value * 60 - 60 + 25 / 2}px;
`;

export const FactorImportanceSlider: React.FC<{factor: string}> = props => {
  const [value, setValue] = React.useState(1);
  return (
    <Container>
      <Factor>{props.factor}:</Factor>
      <Centered>
        <Icon name="arrow-circle-down-outline" fill="#000" />
        <Layout>
          <ToolTip value={value} />
          <Slider
            onLayout={e => console.log(e.nativeEvent)}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={setValue}
          />
        </Layout>
        <Icon name="arrow-circle-up-outline" fill="#000" />
      </Centered>
    </Container>
  );
};

const Container = styled(Layout)`
  align-items: center;
`;

const Factor = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const Centered = styled(Layout)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(UIKittenIcon)`
  height: 32px;
  width: 32px;
`;

const Slider = styled(RNSlider)`
  width: 300px;
`;
