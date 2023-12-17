import {Text} from 'react-native';
import {useAppRoute} from '../hooks/appNavigation';
import {ROUTES} from '../router/routes.ts';
import {useQuery} from '@tanstack/react-query';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {FlashList} from '@shopify/flash-list';
import {ArtCollectionItem} from '../components/Card/ArtCollectionItem';
import {ScreenContainer} from '../components/container/screenContainer';

export const ArtistScreen = () => {
  const {params} = useAppRoute<typeof ROUTES.ARTIST>();

  const {data: artist, isLoading} = useQuery({
    queryKey: [`${ROUTES.ARTIST}-${params.name}`],
    queryFn: () =>
      getRijksArtCollection({
        artist: params.name,
      }),
    enabled: !!params.name,
  });
  console.log(artist);

  return (
    <ScreenContainer>
      {isLoading && <Text>Loading...</Text>}
      {artist && !isLoading && (
        <FlashList
          data={artist?.artObjects}
          keyExtractor={(item, index) => item?.id ?? index.toString()}
          renderItem={({item}) => <ArtCollectionItem {...item} />}
          estimatedItemSize={50}
        />
      )}
    </ScreenContainer>
  );
};
