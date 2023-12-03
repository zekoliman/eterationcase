import React, {useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {setGlobalLoadState} from '../redux/slices/globalLoadState';
import {getProducts} from '../redux/slices/productsSlice';

const SplashScreen: React.FC = ({navigation}) => {
  const dispatch = useAppDispatch();

  const goHomeScreen = async () => {
    dispatch(setGlobalLoadState(true));
    await dispatch(getProducts());
    setTimeout(() => {
      navigation.navigate('HomeBottomWrapper');
    }, 500);
    return dispatch(setGlobalLoadState(false));
  };

  useEffect(() => {
    goHomeScreen();
  }, []);

  return <></>;
};

export default SplashScreen;
