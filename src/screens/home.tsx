import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import {ROUTES} from '../router/routes';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {ArtCollectionItem} from '../components/Card/ArtCollectionItem';
import {ScreenContainer} from '../components/screenContainer';
import {Loading} from '../components/loading';
import {EmptyList} from '../components/emptyList';

export const HomeScreen = () => {
  const {data: homeArtList, isLoading} = useQuery({
    queryKey: [ROUTES.MUSEUM],
    queryFn: () => getRijksArtCollection({resultsPerPage: 450}),
  });

  return (
    <ScreenContainer>
      <Loading isLoading={isLoading} />
      {homeArtList && (
        <FlashList
          data={homeArtList.artObjects}
          keyExtractor={(item, index) => item?.id ?? index.toString()}
          renderItem={({item}) => <ArtCollectionItem {...item} />}
          estimatedItemSize={450}
          ListEmptyComponent={EmptyList}
        />
      )}
    </ScreenContainer>
  );
};
