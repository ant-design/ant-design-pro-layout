import { useEffect } from 'react';
import { isBrowser } from './utils';
import defaultSettings from '../defaultSettings';

export function useDocumentTitle(
  title: string,
  appDefaultTitle: string = defaultSettings.title,
) {
  const titleText = typeof title === 'string' ? title : appDefaultTitle;
  useEffect(() => {
    if (isBrowser() && titleText) {
      document.title = titleText;
    }
  }, [title]);
}
