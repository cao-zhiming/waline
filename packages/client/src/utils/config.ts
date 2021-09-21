import { defaultLang, defaultUploadImage, getMeta, locales } from '../config';

import { decodePath, removeEndingSplash } from '.';
import { getEmojis } from './emoji';

import type { EmojiInfo, EmojiMaps, Locale, WalineOptions } from '../config';

export interface EmojiConfig {
  tabs: Pick<EmojiInfo, 'name' | 'icon' | 'items'>[];
  map: EmojiMaps;
}

export interface Config
  extends Required<
      Pick<
        WalineOptions,
        | 'el'
        | 'path'
        | 'lang'
        | 'meta'
        | 'pageSize'
        | 'requiredMeta'
        | 'uploadImage'
        | 'copyright'
        | 'login'
      >
    >,
    Pick<WalineOptions, 'dark' | 'serverURL' | 'visitor' | 'highlight'> {
  locale: Locale;
  wordLimit: [number, number] | false;
  emoji: Promise<EmojiConfig>;
}

export const getConfig = ({
  el = '#waline',
  serverURL,

  path = location.pathname,
  lang = defaultLang,
  locale,
  emoji = ['https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo'],
  meta = ['nick', 'mail', 'link'],
  requiredMeta = [],
  pageSize = 10,
  wordLimit,
  uploadImage,
  copyright = true,
  login = 'enable',
  ...more
}: WalineOptions): Config => ({
  el,
  // remove ending slash
  serverURL: removeEndingSplash(serverURL),
  path: decodePath(path),
  lang,
  locale: {
    ...(locales[lang] || locales[defaultLang]),
    ...(typeof locale === 'object' ? locale : {}),
  },
  emoji: getEmojis(emoji),
  wordLimit: Array.isArray(wordLimit)
    ? wordLimit
    : wordLimit
    ? [0, wordLimit]
    : false,
  meta: getMeta(meta),
  requiredMeta: getMeta(requiredMeta),
  pageSize,
  uploadImage:
    typeof uploadImage === 'function'
      ? uploadImage
      : uploadImage === false
      ? false
      : defaultUploadImage,
  copyright,
  login,
  ...more,
});
