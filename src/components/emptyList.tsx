import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {appTheme} from '../theme';

export const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empty ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: appTheme.colors.text,
  },
});
