import {create} from 'zustand';
import {persist, PersistStorage, StorageValue} from 'zustand/middleware';
import {BookmarkedArtObject, createBookmarkedArtObjectSlice} from './index.ts';
import {ArtObject} from 'api/types.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {act} from 'react-test-renderer';

// Mock for AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock for createJSONStorage
const storageWrapper: PersistStorage<BookmarkedArtObject> = {
  getItem: async (
    name: string,
  ): Promise<StorageValue<BookmarkedArtObject> | null> => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: StorageValue<BookmarkedArtObject | null>) => {
    const item = JSON.stringify(value);
    return AsyncStorage.setItem(name, item);
  },
  removeItem: (name: string) => {
    return AsyncStorage.removeItem(name);
  },
};

describe('useBookmarkStore', () => {
  let useBookmarkStore;
  let store: any;

  const artObject1: ArtObject = {id: '1', title: 'Art 1'};
  const artObject2: ArtObject = {id: '2', title: 'Art 2'};
  const updatedArtObject1: ArtObject = {id: '1', title: 'Updated Art 1'};

  beforeEach(() => {
    useBookmarkStore = create(
      persist(createBookmarkedArtObjectSlice, {
        name: 'bookmarked-art-objects',
        storage: storageWrapper,
      }),
    );
    store = useBookmarkStore;
    AsyncStorage.clear();
  });

  test('initial state should have empty bookmarks', async () => {
    await act(async () => {
      expect(store.getState().bookmarks).toEqual([]);
    });
  });

  test('addBookMarks should add a new art object to bookmarks', async () => {
    await act(async () => {
      store.getState().addBookMarks(artObject1);
    });
    expect(store.getState().bookmarks).toContain(artObject1);
  });

  test('deleteBookmarks should remove an art object from bookmarks', async () => {
    await act(async () => {
      store.getState().addBookMarks(artObject1);
      store.getState().deleteBookmarks(artObject1.id);
    });
    expect(store.getState().bookmarks).not.toContain(artObject1);
  });

  test('getBookmarkById should return the correct art object', async () => {
    await act(async () => {
      store.getState().addBookMarks(artObject1);
      store.getState().addBookMarks(artObject2);
    });
    const result = store.getState().getBookmarkById(artObject2.id);
    expect(result).toEqual(artObject2);
  });

  test('updateBookmarks should update an art object in bookmarks', async () => {
    await act(async () => {
      store.getState().addBookMarks(artObject1);
      store.getState().updateBookmarks(updatedArtObject1);
    });
    const result = store.getState().getBookmarkById(artObject1.id);
    expect(result).toEqual(updatedArtObject1);
  });
});
