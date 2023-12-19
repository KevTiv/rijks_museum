import {useCallback} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenContainer} from '../components/screenContainer';
import FastImage from 'react-native-fast-image';
import {useAppNavigation, useAppRoute} from '../hooks/appNavigation';
import {ROUTES} from '../router/routes';
import {useQuery} from '@tanstack/react-query';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {appTheme} from '../theme';
import {Bookmark, Download} from '../components/icons';
import {useBookmarkStore} from '../store';
import {Loading} from '../components/loading';
import {useDownloadImage} from '../hooks/downloadImage';

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
  const {getBookmarkById, deleteBookmarks, addBookMarks} = useBookmarkStore();
  const bookmarkStatus = getBookmarkById(params.id) ? 'Bookmarked' : 'Bookmark';
  const handleBookmarkStatusClick = useCallback(
    (id?: string) => {
      if (id && getBookmarkById(id)) {
        deleteBookmarks(id);
      } else if (!getBookmarkById(id) && artPiece?.artObject) {
        addBookMarks(artPiece.artObject);
      }
    },
    [addBookMarks, artPiece?.artObject, deleteBookmarks, getBookmarkById],
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
        {artPiece && (
          <>
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (artPiece?.artObject?.principalMaker) {
                    router.navigate(ROUTES.ARTIST, {
                      name: artPiece.artObject.principalMaker,
                    });
                  }
                }}>
                <Text style={styles.artist}>
                  {artPiece?.artObject?.principalMaker}
                </Text>
              </TouchableWithoutFeedback>

              <View style={styles.download}>
                <TouchableOpacity
                  onPress={() => handleBookmarkStatusClick(params?.id)}
                  disabled={getBookmarkById(params.id) !== undefined}>
                  <View style={styles.artQuickAction}>
                    <Bookmark
                      fill={
                        getBookmarkById(params.id) !== undefined
                          ? appTheme.colors.primary
                          : appTheme.colors.text
                      }
                    />
                    <Text style={{color: 'white'}}>{bookmarkStatus}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    if (params?.id && params.webImage?.url) {
                      await handleDownloadImage(
                        params?.id,
                        params.webImage?.url,
                      );
                    }
                  }}
                  style={styles.artQuickAction}>
                  <Download />
                  <Text style={{color: 'white'}}>Download image</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.title}>{params?.longTitle}</Text>
            <Text style={styles.description}>
              {artPiece?.artObject?.plaqueDescriptionEnglish}
            </Text>
            <Text style={styles.description}>
              {artPiece?.artObject?.label?.makerLine}
            </Text>
            <Text style={styles.description}>
              {artPiece?.artObject?.label?.description}
            </Text>
            <Text style={styles.subLabel}>
              Dimensions: {artPiece?.artObject?.subTitle}
            </Text>
            {artPiece.artObject?.location && (
              <Text style={styles.subLabel}>
                Location: {artPiece?.artObject?.location}
              </Text>
            )}
          </>
        )}
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
  artist: {
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 8,
    color: appTheme.colors.primary,
  },
  artQuickAction: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: appTheme.colors.text,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 8,
    marginHorizontal: 2,
    color: appTheme.colors.text,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 4,
    color: appTheme.colors.text,
  },
  imgContainer: {
    width: '100%',
    height: 350,
    borderRadius: 8,
    opacity: 0.9,
  },
  download: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
