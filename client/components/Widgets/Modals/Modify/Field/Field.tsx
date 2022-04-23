import { FC, useRef, useEffect } from 'react';
import fieldStyle from './field.module.css';
import { useGetChurchInfoQuery } from 'store/redux-caching/church-info-cache';
import { processUserInput } from 'components/Widgets/Modals/Modify/Field/info-slice';
import { useAppDispatch } from 'hooks/redux-hooks';
import type { ChurchInfo } from 'types/server';
import { useSession } from 'next-auth/react';

const Field: FC<{
  id: string;
  name: string;
}> = ({ children, id, name }) => {
  const monumentInfo = useGetChurchInfoQuery(name).currentData
    ?.payload as ChurchInfo;
  console.log(name);
  const user = useSession().data?.user;
  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current
      ? (textareaRef.current.value = monumentInfo?.churchDescription || '')
      : null;
    textareaRef.current?.click();
  }, []);

  return (
    <div className={fieldStyle.container}>
      <div className={fieldStyle.terminal}>
        <div className={fieldStyle.name__status}>
          <div className={fieldStyle.name}>@user.anonim</div>
          <div className={fieldStyle.status}>{children}</div>
        </div>
        <div className={fieldStyle.input}>
          <div className={fieldStyle.fieldName}>descriere ~#</div>
          <div className={fieldStyle.fieldInput}>
            <textarea
              aria-describedby={id}
              ref={textareaRef}
              className={fieldStyle.textarea}
              onClick={(event) => {
                textareaRef.current
                  ? (textareaRef.current.style.height = `${event.currentTarget.scrollHeight}px`)
                  : null;
              }}
              onKeyUp={(event) => {
                const placeholder = textareaRef.current as HTMLTextAreaElement;
                event.code === 'Backspace'
                  ? ((placeholder.style.height = 'auto'),
                    (placeholder.style.height = `${event.currentTarget.scrollHeight}px`))
                  : (placeholder.style.height = `${event.currentTarget.scrollHeight}px`);
                dispatch(
                  processUserInput({
                    info: event.currentTarget.value,
                    churchName: name,
                    user: user?.name || 'ANONYM',
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className={fieldStyle.tip}></div>
    </div>
  );
};

export default Field;
