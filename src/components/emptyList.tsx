import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {appTheme} from '../theme';

type LoadingProps = {
  isLoading: boolean;
};
export const EmptyList = ({isLoading}: LoadingProps) => {
  return isLoading ? (
    <View style={styles.container}>
      <Text style={styles.title}>Empty ...</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: appTheme.colors.text,
  },
});
