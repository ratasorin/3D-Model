import { convertFromRaw, RawDraftContentState } from 'draft-js';

export const descriptionFrom = (content: string) => {
  const description =
    convertFromRaw(JSON.parse(content) as RawDraftContentState)
      .getPlainText()
      .slice(0, 150) + '...';
  return description;
};
