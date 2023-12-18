import {StyleSheet, Text, View} from 'react-native';
import {userUserAction, UserAction} from '../store';

type BookmarksUserActionsProps = {
  handleAction: (action: UserAction) => void;
};
export const BookmarksUserActions = ({
  handleAction,
}: BookmarksUserActionsProps) => {
  const {getCurrentAction} = userUserAction();

  return (
    <View style={styles.container}>
      <Text
        onPress={() => handleAction('manage')}
        style={
          getCurrentAction() === 'manage'
            ? styles.selectedAction
            : styles.userAction
        }>
        Manage
      </Text>
      <Text
        onPress={() => handleAction('location')}
        style={
          getCurrentAction() === 'location'
            ? styles.selectedAction
            : styles.userAction
        }>
        Location
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  userAction: {
    fontSize: 16,
    fontWeight: '400',
  },
  selectedAction: {
    fontSize: 16,
    fontWeight: '400',
    color: 'blue',
  },
});
