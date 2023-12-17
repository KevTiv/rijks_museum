import React from 'react';
import {View} from 'react-native';
type Props = {
  children: React.ReactNode;
};
export const ScreenContainer = ({children}: Props) => {
  return <View style={{flex: 1, paddingHorizontal: 12}}>{children}</View>;
};
