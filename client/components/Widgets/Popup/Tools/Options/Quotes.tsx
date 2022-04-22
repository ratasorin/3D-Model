import { toggleStyle } from 'lib/edit-text';
import option__style from './_option.module.css';

const Quotes = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('QUOTE');
      }}
      className={option__style.button}
    >
      <code>`&quot`Q`&quot`</code>
    </button>
  );
};

export default Quotes;
