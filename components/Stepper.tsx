import React from 'react';
import {Layout, Icon as UKIcon, Text} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Icon: React.FC<React.ComponentProps<typeof UKIcon>> = props => (
  <UKIcon style={{width: 32, height: 32}} fill="#8F9BB3" {...props} />
);

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const Stepper: React.FC<Props> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
}) => {
  const inc = React.useCallback(() => {
    if (value + 1 > max) return;
    onChange(value + 1);
  }, [value, max]);

  const dec = React.useCallback(() => {
    if (value - 1 < min) return;
    onChange(value - 1);
  }, [value, min]);

  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={dec} disabled={value === min}>
        <Icon name="minus-circle-outline" />
      </TouchableOpacity>
      <Text
        style={{marginHorizontal: 10, fontVariant: ['tabular-nums']}}
        category="h5">
        {value.toString()}
      </Text>
      <TouchableOpacity onPress={inc} disabled={value === max}>
        <Icon name="plus-circle-outline" />
      </TouchableOpacity>
    </Layout>
  );
};
