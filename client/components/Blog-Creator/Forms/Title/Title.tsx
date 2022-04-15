import { useAppDispatch } from 'hooks/redux-hooks';
import { changeTitle } from './title-slice';
import title__style from './title.module.css';

const Title = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={title__style.container}>
      <input
        type="text"
        placeholder="TITLU"
        className={title__style.input}
        onChange={(e) => {
          dispatch(changeTitle(e.target.value));
        }}
      />
    </div>
  );
};

export default Title;
