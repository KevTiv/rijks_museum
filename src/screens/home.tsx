import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import {MotiView} from 'moti';
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
      <MotiView
        animateInitialState={true}
        style={{flex: 1}}
        from={{
          scale: 0.8,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          type: 'timing',
          duration: 600,
          delay: 100,
        }}>
        {homeArtList && !isLoading && (
          <FlashList
            data={homeArtList.artObjects}
            keyExtractor={(item, index) => item?.id ?? index.toString()}
            renderItem={({item}) => <ArtCollectionItem {...item} />}
            estimatedItemSize={450}
            ListEmptyComponent={EmptyList}
          />
        )}
      </MotiView>
    </ScreenContainer>
  );
};
