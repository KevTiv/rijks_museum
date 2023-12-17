import {ArtObject} from '../../api/types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ArrowForward, Bookmark, EmptyBookmark} from '../icons';
import {useAppNavigation} from '../../hooks/appNavigation.ts';
import {ROUTES} from '../../router/routes.ts';
import {useStore} from '../../store';
import {useCallback, useMemo} from 'react';

export const ArtCollectionItem = (props: ArtObject) => {
  const router = useAppNavigation();

  const {getBookmarks, addBookMarks, bookmarks} = useStore();
  const isSelected = useCallback(() => {
    return getBookmarks().some(entry => entry.id === props.id);
  }, [getBookmarks, props.id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => addBookMarks(props)}
        disabled={isSelected()}
        style={styles.bookmarkBtn}>
        {isSelected() ? (
          <Bookmark stroke="black" width={44} height={44} fill={'white'} />
        ) : (
          <EmptyBookmark stroke="black" width={44} height={44} fill={'white'} />
        )}
      </TouchableOpacity>
      <FastImage
        style={styles.imgContainer}
        source={{uri: props.webImage?.url}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.info}>
        <Text style={styles.cardTitle}>{props?.longTitle}</Text>
        <Text style={styles.artist}>By {props?.principalOrFirstMaker}</Text>
      </View>
      <TouchableOpacity
        style={styles.bottomNavBtn}
        disabled={props?.id === undefined}
        onPress={() => {
          if (props?.id) {
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
