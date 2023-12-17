import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MuseumStackNavigation} from './StackProvidder';
import {BooksmarksScreen} from '../screens';
import {RootTabNavigationParams} from './route.types';
import {ROUTES} from './routes';
import {NavigationContainer} from '@react-navigation/native';
import {EmptyBookmark, Museum} from '../components/icons';
import {Bookmark} from '../components/icons/bookmark.tsx';

const Tab = createBottomTabNavigator<RootTabNavigationParams>();

export const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={ROUTES.MUSEUM}
          component={MuseumStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Museum
                width={24}
                height={24}
                stroke="currentColor"
                fill="currentColor"
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.BOOKMARKS}
          component={BooksmarksScreen}
          options={{
            tabBarIcon: () => (
              <Bookmark
                stroke="white"
                width={20}
                height={24}
                fill="currentColor"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
