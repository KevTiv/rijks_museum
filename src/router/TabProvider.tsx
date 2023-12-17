import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MuseumStackNavigation} from './StackProvidder.tsx';
import {BooksmarksScreen} from '../screens';
import {RootTabNavigationParams} from './route.types.ts';
import {ROUTES} from './routes.ts';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator<RootTabNavigationParams>();

export const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={ROUTES.MUSEUM}
          component={MuseumStackNavigation}
          options={{headerShown: false}}
        />
        <Tab.Screen name={ROUTES.BOOKMARKS} component={BooksmarksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
