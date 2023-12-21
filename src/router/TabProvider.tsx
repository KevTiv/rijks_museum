import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MuseumStackNavigation} from './StackProvidder';
import {BookmarksScreen} from '../screens';
import {RootTabNavigationParams} from './route.types';
import {ROUTES} from './routes';
import {Museum} from '../components/icons';
import {Bookmark} from '../components/icons/bookmark';
import {appTheme} from '../theme';
import {BackButton} from '../components/BackButton.tsx';

const Tab = createBottomTabNavigator<RootTabNavigationParams>();

export const TabNavigator = () => {
  return (
    <NavigationContainer theme={appTheme}>
      <Tab.Navigator
        backBehavior="history"
        initialRouteName={ROUTES.MUSEUM}
        screenOptions={{headerLeft: BackButton}}>
        <Tab.Screen
          name={ROUTES.MUSEUM}
          component={MuseumStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
              <Museum
                stroke={color}
                width={size}
                height={size}
                fill={
                  focused
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.7)'
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.BOOKMARKS}
          component={BookmarksScreen}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Bookmark
                stroke={color}
                width={size}
                height={size}
                fill={
                  focused
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.7)'
                }
              />
            ),
            headerLeft: undefined,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
