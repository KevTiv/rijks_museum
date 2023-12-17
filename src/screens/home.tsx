import {View, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {ROUTES} from '../router/routes.ts';
import {getRijksArtCollection} from '../api/rijksMuseum.ts';

export const HomeScreen = () => {
  const {data: homeArtList} = useQuery({
    queryKey: [ROUTES.MUSEUM],
    queryFn: () => getRijksArtCollection({}),
  });

  console.log(homeArtList);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};
