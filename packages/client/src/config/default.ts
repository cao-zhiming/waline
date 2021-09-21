import type { Meta } from './options';

const availableMeta: Meta[] = ['nick', 'mail', 'link'];

export const getMeta = (meta: Meta[]): Meta[] =>
  meta.filter((item) => availableMeta.includes(item));

export const defaultLang = 'zh-CN';

export const defaultUploadImage = (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  return fetch('https://pic.alexhchu.com/api/upload', {
    method: 'POST',
    body: formData,
  })
    .then((resp) => resp.json())
    .then((resp: { data: { url: string } }) => resp.data.url);
};
