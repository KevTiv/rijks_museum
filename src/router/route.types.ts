import {ROUTES} from './routes';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ArtObject} from '../api/types';

export type MuseumStacksRoutePrams = {
  [ROUTES.HOME]: undefined;
  [ROUTES.ART]: ArtObject;
  [ROUTES.ARTIST]: {
    name: string;
  };
};

export type RootTabNavigationParams = {
  [ROUTES.MUSEUM]: MuseumStacksRoutePrams;
  [ROUTES.BOOKMARKS]: undefined;
};

type AppRoutesParams = RootTabNavigationParams & MuseumStacksRoutePrams;
export type AppRoutes = keyof AppRoutesParams;
export type AppStackNavigation<T extends AppRoutes> = NativeStackNavigationProp<
  AppRoutesParams,
  T
>;
export type AppStackRoute<T extends AppRoutes> = RouteProp<AppRoutesParams, T>;
