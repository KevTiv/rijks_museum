import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ArtObject} from '../../api/types.ts';
import {BookmarkOverlay} from '../BookmarkOverlay';
import {userUserAction} from '../../store';
import {useAppNavigation} from '../../hooks/appNavigation';
import {ROUTES} from '../../router/routes';

export const BookmarkItem = (props: ArtObject) => {
  const router = useAppNavigation();
  const {getCurrentAction} = userUserAction();
  const isOverlayApplied = getCurrentAction() !== undefined;

  return (
    <TouchableOpacity
      onPress={() => router.navigate(ROUTES.ART, props)}
      disabled={isOverlayApplied}
      style={styles.container}>
      <FastImage
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
        }}
        source={{uri: props.webImage?.url}}
        resizeMode={FastImage.resizeMode.cover}
      />
      {!isOverlayApplied && <Text style={styles.title}>{props.title}</Text>}
      <BookmarkOverlay
        isOverlayApplied={isOverlayApplied}
        id={props.id}
        url={props.webImage?.url}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    overflow: 'hidden',
    zIndex: 0,
  },
  title: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: '80%',
    fontWeight: '700',
    color: 'white',
  },
});
