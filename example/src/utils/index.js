import { Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const DEFAULT_CENTER_COORDINATE = [106.678, 10.788];
export const SF_OFFICE_COORDINATE = [-122.400021, 37.789085];

export function onSortOptions (a, b) {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
}
