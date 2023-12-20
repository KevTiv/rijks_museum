import {TouchableOpacity} from 'react-native';
import {useCallback} from 'react';
import {useAppNavigation} from '../hooks/appNavigation.ts';
import {ArrowHead} from './icons';
import {appTheme} from '../theme';

export const BackButton = () => {
  const router = useAppNavigation();
  const handleGoBack = useCallback(async () => {
    if (router.canGoBack()) {
      router.goBack();
    }
  }, [router]);

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <ArrowHead color={appTheme.colors.primary} />
    </TouchableOpacity>
  );
};
