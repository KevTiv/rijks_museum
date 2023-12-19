import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {userUserAction, UserAction} from '../store';

type BookmarksUserActionsProps = {
  handleAction: (action: UserAction) => void;
  userInput?: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
};
export const BookmarksUserActions = ({
  handleAction,
  userInput,
  setUserInput,
}: BookmarksUserActionsProps) => {
  const {getCurrentAction} = userUserAction();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleAction('manage')}
          style={[
            styles.action,
            styles.unselectedAction,
            getCurrentAction() === 'manage' && styles.selectedAction,
          ]}>
          <Text>Manage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAction('search')}
          style={[
            styles.action,
            styles.unselectedAction,
            getCurrentAction() === 'search' && styles.selectedAction,
          ]}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      {getCurrentAction() === 'search' && (
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder={'Search Artist...'}
          placeholderTextColor={'white'}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
    paddingVertical: 4,
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  unselectedAction: {
    opacity: 0.4,
    backgroundColor: 'white',
  },
  selectedAction: {
    opacity: 1,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    height: 40,
  },
});
