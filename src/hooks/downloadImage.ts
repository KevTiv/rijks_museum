// Ref: https://github.com/EvanBacon/expo-swift-example
import {NativeModules, Platform} from 'react-native';
import {useCallback} from 'react';
import {useBookmarkStore} from '../store';

type ImageDownloader = {
  downloadImage(url: string): Promise<string>;
};

const {DownloadRijksArtImage} = NativeModules as {
  DownloadRijksArtImage: ImageDownloader;
};

const isIOS = Platform.OS === 'ios';

export function useDownloadImage() {
  const {getBookmarkById, updateBookmarks} = useBookmarkStore();

  const handleDownloadImage = useCallback(
    async (id: string, url: string) => {
      try {
        if (isIOS) {
          return DownloadRijksArtImage.downloadImage(url).then(
            (savedImgURI: string) => {
              const bookmark = getBookmarkById(id);
              if (bookmark) {
                updateBookmarks({
                  ...bookmark,
                  webImage: {
                    ...bookmark.webImage,
                    url: savedImgURI,
                  },
                });
              }
            },
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [getBookmarkById, updateBookmarks],
  );

  return {handleDownloadImage};
}
