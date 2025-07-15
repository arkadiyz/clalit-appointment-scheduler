import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SupportedLanguage, translations } from '../translations';
import { I18nManager } from 'react-native';

export const useTranslation = () => {
  const currentLanguage = useSelector((state: RootState) => state.app.currentLanguage);
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'he';

  const changeLanguageDirection = (language: SupportedLanguage) => {
    const shouldBeRTL = language === 'he';
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
    }
  };

  return {
    t,
    currentLanguage,
    isRTL,
    changeLanguageDirection,
  };
};
