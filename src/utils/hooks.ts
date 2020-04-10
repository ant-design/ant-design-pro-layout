import { useEffect } from 'react';
import { isBrowser } from './utils';
import defaultSettings from '../defaultSettings';

export function useDocumentTitle(title: string, appDefaultTitle?: string) {
  const titleText =
    typeof title === 'string'
      ? title
      : appDefaultTitle || defaultSettings.title;
  useEffect(() => {
    if (isBrowser()) {
      document.title = titleText;
    }
  }, [title]);
}
