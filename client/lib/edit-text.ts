import { EditorState, RichUtils } from 'draft-js';
import { map, Observable, Subject, withLatestFrom } from 'rxjs';

const style$ = new Subject<string>();

export const toggleStyle = (style: string) => {
  style$.next(style);
};

export const composeStyle = (editorState$: Observable<EditorState>) => {
  return style$.pipe(
    withLatestFrom(editorState$),
    map(([style, editorState]) => {
      return RichUtils.toggleInlineStyle(editorState, style);
    })
  );
};
