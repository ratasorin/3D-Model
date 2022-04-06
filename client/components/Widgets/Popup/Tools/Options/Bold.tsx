import { toggleStyle } from 'lib/edit-text';
import option__style from './_option.module.css';
const Bold = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('BOLD');
      }}
      className={option__style.button}
    >
      <b>B</b>
    </button>
  );
};

export default Bold;
