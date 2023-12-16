import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ArtScreen, HomeScreen, ArtistScreen} from '../screens';
import {MuseumStacksRoutePrams} from './route.types.ts';
import {ROUTES} from './routes.ts';

const Stack = createNativeStackNavigator<MuseumStacksRoutePrams>();

export const MuseumStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.ART} component={ArtScreen} />
      <Stack.Screen name={ROUTES.ARTIST} component={ArtistScreen} />
    </Stack.Navigator>
  );
};
