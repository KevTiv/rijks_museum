/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {TabNavigator} from './src/router';

const client = new QueryClient();
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <QueryClientProvider client={client}>
        <TabNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
