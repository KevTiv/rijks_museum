import {useCallback} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {ScreenContainer} from '../components/screenContainer';
import FastImage from 'react-native-fast-image';
import {AnimatePresence} from 'moti';
import {useAppNavigation, useAppRoute} from '../hooks/appNavigation';
import {ROUTES} from '../router/routes';
import {useQuery} from '@tanstack/react-query';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {useBookmarkStore} from '../store';
import {Loading} from '../components/loading';
import {useDownloadImage} from '../hooks/downloadImage';
import {ArtDetails} from '../components/Card/ArtDetails.tsx';

export const ArtScreen = () => {
  const router = useAppNavigation();
  const {params} = useAppRoute<typeof ROUTES.ART>();

  // Remove the "EN-" "NL-" identifier at the beginning of the id
  const artPieceId = params.id?.split('-').slice(1).join('-') ?? '';
  const {data: artPiece, isLoading} = useQuery({
    queryKey: [ROUTES.ART, params.id],
    queryFn: () =>
      getRijksArtCollection({
        artPieceId,
      }),
    enabled: !!artPieceId,
  });

  const {handleDownloadImage} = useDownloadImage();
  const {getBookmarkById, addBookMarks} = useBookmarkStore();
  const bookmarkStatus = getBookmarkById(params.id) ? 'Bookmarked' : 'Bookmark';
  const handleBookmarkStatusClick = useCallback(
    (id?: string) => {
      if (!getBookmarkById(id) && artPiece?.artObject) {
        addBookMarks(artPiece.artObject);
      }
    },
    [addBookMarks, artPiece?.artObject, getBookmarkById],
  );
  const getIsImgSavedInGallery = useCallback(
    () =>
      (params.webImage?.url?.includes('file:///') ||
        getBookmarkById(params.id)?.webImage?.url?.includes('file:///')) ??
      false,
    [getBookmarkById, params.id, params.webImage?.url],
  );

  return (
    <ScreenContainer>
      <ScrollView>
        <FastImage
          style={styles.imgContainer}
          source={{uri: params?.webImage?.url}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Loading isLoading={isLoading} />
        <AnimatePresence>
          <ArtDetails
            router={router}
            params={params}
            artPiece={artPiece}
            getBookmarkById={getBookmarkById}
            getIsImgSavedInGallery={getIsImgSavedInGallery}
            bookmarkStatus={bookmarkStatus}
            handleBookmarkStatusClick={handleBookmarkStatusClick}
            handleDownloadImage={handleDownloadImage}
          />
        </AnimatePresence>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    marginVertical: 4,
  },
  imgContainer: {
    width: '100%',
    height: 350,
    borderRadius: 8,
    opacity: 0.9,
  },
});
