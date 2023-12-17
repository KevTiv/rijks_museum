import {ArtObject} from '../../api/types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ArrowForward} from '../icons';
import {Bookmark} from '../icons/bookmark.tsx';
import {useAppNavigation} from '../../hooks/appNavigation.ts';
import {ROUTES} from '../../router/routes.ts';

export const ArtCollectionItem = (props: ArtObject) => {
  const isSelected = false;
  const router = useAppNavigation();
  console.log('props??', props);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bookmarkBtn}>
        <Bookmark
          stroke="black"
          width={44}
          height={44}
          fill={isSelected ? 'black' : 'none'}
        />
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
