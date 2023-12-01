import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../redux/hooks';

const CustomLoader: React.FC = () => {
  const {isLoading} = useAppSelector(state => state.globalLoad);

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.indicator} />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 99999,
  },
  indicator: {
    width: 550,
    height: 550,
    alignSelf: 'center',
  },
});
