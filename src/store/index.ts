import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {ArtObject} from '../api/types.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BookmarkedArtObject = {
  bookmarks: ArtObject[];
  getBookmarks: () => ArtObject[];
  addBookMarks: (artObject: ArtObject) => void;
  deleteBookmarks: (artObjectId: string) => void;
  getBookmarkById: (id: string) => ArtObject | undefined;
};

const createBookmarkedArtObjectSlice: StateCreator<BookmarkedArtObject> = (
  set,
  get,
) => ({
  bookmarks: [],
  getBookmarks: () => get().bookmarks,
  addBookMarks: artObject => {
    set(state => {
      if (!state.bookmarks.some(obj => obj.id === artObject.id)) {
        return {
          bookmarks: [...state.bookmarks, artObject],
        };
      } else {
        return {
          bookmarks: [...state.bookmarks, artObject],
        };
      }
    });
  },
  deleteBookmarks: artObjectId => {
    set(state => ({
      bookmarks: state.bookmarks.filter(obj => obj.id !== artObjectId),
    }));
  },
  getBookmarkById: id => {
    return get().bookmarks.find(entry => entry.id === id);
  },
});

export const useStore = create(
  persist(createBookmarkedArtObjectSlice, {
    name: 'bookmarked-art-objects', // unique name for persisting the state
    // include other persist configuration if needed
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
