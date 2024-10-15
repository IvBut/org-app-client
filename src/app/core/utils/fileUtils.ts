import { HttpHeaders } from '@angular/common/http';
import { startCase } from 'lodash';
import { TNullableType } from '../models/types';

export const downloadFileBlob = (blob: Blob, fileName: string) => {
  const a = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);
  a.href = objectUrl;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(objectUrl);
};

export const getFileNameFromHeader = (
  headers: HttpHeaders,
  headerName: string = 'content-disposition'
): TNullableType<string> => {
  const disposition = headers.get(headerName) || headers.get(startCase(headerName));
  if (!disposition) {
    return null;
  }
  const UTF8_FILENAME_REGEX = /filename\*=UTF-8''([\w%\-.]+)(?:; ?|$)/i;
  const ASCII_FILENAME_REGEX = /filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;
  if (UTF8_FILENAME_REGEX.test(disposition)) {
    const matches = UTF8_FILENAME_REGEX.exec(disposition);
    return matches?.[1] ? decodeURIComponent(matches[1]) : null;
  } else if (ASCII_FILENAME_REGEX.test(disposition)) {
    const matches = ASCII_FILENAME_REGEX.exec(disposition);
    // eslint-disable-next-line no-magic-numbers
    return matches?.[2] ? decodeURIComponent(matches?.[2]) : null;
  }
  return null;
};
