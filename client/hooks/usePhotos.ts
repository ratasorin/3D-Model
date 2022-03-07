import { imageSupplier$ } from 'lib/modal';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';

export interface PhotoActions {
  type: 'REMOVE' | 'ADD';
  src: string;
  name: string;
  file: File;
}

export interface PhotoData {
  src: string;
  name: string;
  file: File;
}

export const photoReducer = (
  prev: PhotoData[],
  action: PhotoActions
): PhotoData[] => {
  switch (action.type) {
    case 'REMOVE':
      return prev.filter(({ src }) => src !== action.src);
    case 'ADD':
      if (prev.find(({ name }) => name === action.name)) {
        return prev;
      } else
        return [
          ...prev,
          { src: action.src, file: action.file, name: action.name },
        ];
  }
};

const usePhotos = () => {
  const [photos, dispatchPhotos] = useReducer(photoReducer, [] as PhotoData[]);
  useEffect(() => {
    imageSupplier$.next(photos.map((photo) => photo.file));
  }, [photos]);
  const addPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    /**
     * when the input receives images, it will store them (along with some details about the files)
     * inside **photos**. The metadata, will help display the thumbnail (through the **src**), avoid
     * duplicates (as the **name** will become the React key at display -keys must be unique so two images
     * with the same name won't meet the criteria-) and post the images to the backend (through the **file**)
     */
    if (event.target.files && event.target.files[0]) {
      dispatchPhotos({
        type: 'ADD',
        src: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name,
        file: event.target.files[0],
      });
    }
  };
  const removePhoto = (src: string, name: string, file: File) =>
    dispatchPhotos({
      type: 'REMOVE',
      src,
      name,
      file,
    });

  return { addPhoto, removePhoto, photos };
};

export default usePhotos;
