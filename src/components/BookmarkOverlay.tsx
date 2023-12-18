import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Trash, Download} from './icons';
import {useBookmarkStore, userUserAction} from '../store';
import {useDownloadImage} from '../hooks/downloadImage';

export const BookmarkOverlay = ({
  id = '',
  isOverlayApplied = false,
  url = '',
}) => {
  const {getCurrentAction} = userUserAction();
  const {deleteBookmarks, getBookmarkById} = useBookmarkStore();
  const {handleDownloadImage} = useDownloadImage();
  const bookmark = getBookmarkById(id);

  return isOverlayApplied ? (
    <View style={styles.container}>
      {getCurrentAction() === 'manage' && (
        <>
          <TouchableOpacity onPress={() => handleDownloadImage(id, url)}>
            <Download width={44} height={44} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteBookmarks(id)}>
            <Trash width={44} height={44} />
          </TouchableOpacity>
        </>
      )}
      {getCurrentAction() === 'location' && (
        <Text style={styles.location}>{bookmark?.principalOrFirstMaker}</Text>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    zIndex: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 4,
    opacity: 0.6,
  },
  location: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
