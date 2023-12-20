import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {MotiView} from 'moti';
import {ROUTES} from '../../router/routes';
import {Bookmark, Download} from '../icons';
import {appTheme} from '../../theme';
import {ArtObject, RijksDataApiResponse} from '../../api/types';
import {
  AppStackNavigation,
  RootTabNavigationParams,
  MuseumStacksRoutePrams,
} from '../../router/route.types';

type ArtDetailsProps = {
  router: AppStackNavigation<
    keyof RootTabNavigationParams | keyof MuseumStacksRoutePrams
  >;
  params: Readonly<ArtObject>;
  artPiece?: RijksDataApiResponse;
  bookmarkStatus: 'Bookmarked' | 'Bookmark';
  getIsImgSavedInGallery: () => boolean | undefined;
  getBookmarkById: (id?: string | undefined) => ArtObject | undefined;
  handleBookmarkStatusClick: (id?: string) => void;
  handleDownloadImage: (id: string, url: string) => Promise<void>;
};
export const ArtDetails = ({
  router,
  params,
  artPiece,
  bookmarkStatus,
  getIsImgSavedInGallery,
  handleBookmarkStatusClick,
  getBookmarkById,
  handleDownloadImage,
}: ArtDetailsProps) => {
  return artPiece ? (
    <>
      <MotiView from={{translateY: 26}} animate={{translateY: 0}}>
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
      </MotiView>

      <MotiView
        from={{translateY: 16}}
        animate={{translateY: 0}}
        style={styles.download}>
        <TouchableOpacity
          style={styles.artQuickAction}
          onPress={() => handleBookmarkStatusClick(params?.id)}
          disabled={getBookmarkById(params.id) !== undefined}>
          <Bookmark
            fill={
              getBookmarkById(params.id) !== undefined
                ? appTheme.colors.primary
                : appTheme.colors.text
            }
          />
          <Text style={{color: appTheme.colors.text}}>{bookmarkStatus}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={getIsImgSavedInGallery()}
          onPress={async () => {
            if (params?.id && params.webImage?.url) {
              await handleDownloadImage(params?.id, params.webImage?.url);
            }
          }}
          style={styles.artQuickAction}>
          <Download
            width={12}
            height={12}
            color={
              getIsImgSavedInGallery()
                ? appTheme.colors.primary
                : appTheme.colors.text
            }
          />
          <Text style={{color: appTheme.colors.text}}>
            {' '}
            {getIsImgSavedInGallery() ? 'Saved in Gallery' : 'Download image'}
          </Text>
        </TouchableOpacity>
      </MotiView>

      <MotiView from={{translateY: 16}} animate={{translateY: 0}}>
        <Text style={styles.title}>{params?.longTitle}</Text>
      </MotiView>
      <MotiView
        from={{translateY: 16, opacity: 0}}
        animate={{translateY: 0, opacity: 1}}>
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
      </MotiView>
    </>
  ) : null;
};

const styles = StyleSheet.create({
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
  download: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
