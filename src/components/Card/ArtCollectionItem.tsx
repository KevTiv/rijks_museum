import {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ArtObject} from '../../api/types';
import {ArrowForward, Bookmark, EmptyBookmark} from '../icons';
import {useAppNavigation} from '../../hooks/appNavigation';
import {ROUTES} from '../../router/routes';
import {useBookmarkStore} from '../../store';

type ArtCollectionItemProps = ArtObject;
export const ArtCollectionItem = (props: ArtCollectionItemProps) => {
  const {id, webImage, longTitle, principalOrFirstMaker} = props;
  const router = useAppNavigation();
  const {addBookMarks, getBookmarks} = useBookmarkStore();
  const getIsBookmarkSelected = useCallback(
    (bookmarkId?: string) =>
      getBookmarks().some(entry => entry.id === bookmarkId),
    [getBookmarks],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => addBookMarks(props)}
        disabled={getIsBookmarkSelected(id)}
        style={styles.bookmarkBtn}>
        {getIsBookmarkSelected(id) ? (
          <Bookmark stroke="black" width={44} height={44} fill={'white'} />
        ) : (
          <EmptyBookmark stroke="black" width={44} height={44} fill={'white'} />
        )}
      </TouchableOpacity>
      <FastImage
        style={styles.imgContainer}
        source={{uri: webImage?.url}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.info}>
        <Text style={styles.cardTitle}>{longTitle}</Text>
        <Text style={styles.artist}>By {principalOrFirstMaker}</Text>
      </View>
      <TouchableOpacity
        style={styles.bottomNavBtn}
        disabled={id === undefined}
        onPress={() => {
          if (id) {
            router.navigate(ROUTES.ART, props);
          }
        }}>
        <ArrowForward stroke="black" width={48} height={48} />
      </TouchableOpacity>
    </View>
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
    height: 650,
    borderRadius: 8,
    opacity: 0.9,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 5,
  },
  bottomNavBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    aspectRatio: 1,
    borderRadius: 100,
    width: '20%',
    flex: 2,
    position: 'absolute',
    bottom: 12,
    right: 12,
    zIndex: 5,
  },
  info: {
    flex: 1,
    position: 'absolute',
    width: '70%',
    bottom: 12,
    left: 12,
    display: 'flex',
  },
  cardTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },
  artist: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    paddingVertical: 8,
  },
});
