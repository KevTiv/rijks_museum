import {useNavigation, useRoute} from '@react-navigation/core';
import {
  AppRoutes,
  AppStackNavigation,
  AppStackRoute,
} from '../router/route.types';

export const useAppRoute = <T extends AppRoutes>() =>
  useRoute<AppStackRoute<T>>();

export const useAppNavigation = <T extends AppRoutes>() =>
  useNavigation<AppStackNavigation<T>>();
