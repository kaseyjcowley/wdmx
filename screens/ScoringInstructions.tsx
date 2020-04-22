import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';

export const ScoringInstructions: React.FC = props => (
  <SafeAreaView style={{flex: 1}}>
    <StatusBar barStyle="dark-content" />
    <Layout level="1" style={[styles.stretch, styles.center, styles.padded]}>
      <View style={styles.center}>
        <Text category="h1" style={styles.header}>
          🥳 Great! 🥳
        </Text>
        <Text category="p1" style={styles.textCenter}>
          Now, you will be asked to rate each of the choices based on the
          factors most important to you.
        </Text>
      </View>
    </Layout>
    <Layout style={styles.padded}>
      <Button style={[styles.button, styles.fullWidth]}>NEXT</Button>
    </Layout>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  padded: {
    padding: 16,
  },
  stretch: {
    flex: 1,
  },
  button: {
    marginTop: 'auto',
  },
  header: {
    marginBottom: 32,
  },
});
