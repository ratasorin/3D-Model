import { imageSupplier$ } from 'hooks/usePhotos';
import { Subject, map } from 'rxjs';

export type providedField = {
  field: string;
  hasProvided: boolean;
};

/**
 * **modal$** opens and closes the modal on button click.
 */
export const modal$ = new Subject<boolean>();

export const imagesFrom = (church: string) =>
  imageSupplier$.pipe(
    map((files) => {
      return {
        files: files,
        from: church,
      };
    }),
    map(({ files, from }) => {
      const form = new FormData();
      files.forEach((file) => form.append(from, file));
      return form;
    })
  );
