import {FlashList} from '@shopify/flash-list';

import {useBookmarkStore, UserAction, userUserAction} from '../store';
import {ScreenContainer} from '../components/screenContainer';
import {BookmarkItem} from '../components/Card/BookmarkItem';
import {BookmarksUserActions} from '../components/BookmarksUserActions';
import {useCallback} from 'react';

export const BookmarksScreen = () => {
  const {getBookmarks} = useBookmarkStore();
  const {setCurrentAction, getCurrentAction} = userUserAction();
  const handleAction = useCallback(
    (action: UserAction) =>
      setCurrentAction(getCurrentAction() !== action ? action : undefined),
    [getCurrentAction, setCurrentAction],
  );

  return (
    <ScreenContainer>
      <BookmarksUserActions handleAction={handleAction} />
      {getBookmarks().length > 0 && (
        <FlashList
          data={getBookmarks()}
          estimatedItemSize={50}
          keyExtractor={item => item.id!}
          numColumns={2}
          renderItem={({item}) => <BookmarkItem {...item} />}
        />
      )}
    </ScreenContainer>
  );
};
