import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
type Props = ViewProps;
export const ScreenContainer = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
