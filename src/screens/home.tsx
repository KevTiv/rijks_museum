import {Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {ROUTES} from '../router/routes';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {FlashList} from '@shopify/flash-list';
import {ArtCollectionItem} from '../components/Card/ArtCollectionItem';
import {ScreenContainer} from '../components/container/screenContainer';

export const HomeScreen = () => {
  const {data: homeArtList, isLoading} = useQuery({
    queryKey: [ROUTES.MUSEUM],
    queryFn: () => getRijksArtCollection({resultsPerPage: 50}),
  });

  return (
    <ScreenContainer>
      {isLoading && <Text>Loading...</Text>}
      {homeArtList && !isLoading && (
        <FlashList
          data={homeArtList?.artObjects}
          keyExtractor={(item, index) => item?.id ?? index.toString()}
          renderItem={({item}) => <ArtCollectionItem {...item} />}
          estimatedItemSize={50}
        />
      )}
    </ScreenContainer>
  );
};
