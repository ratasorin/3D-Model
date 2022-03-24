import { ChangeEvent } from 'react';
import searchbarStyle from './searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useAppDispatch } from 'hooks/redux-hooks';
import { Subject } from 'rxjs';

/**
 * **input$** sends the payload received from input form,
 * to query the results (from the arcGIS external database)
 */
export const searchQuery$ = new Subject<string>();

const Searchbar = () => {
  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    searchQuery$.next(query);
  };
  const dispatch = useAppDispatch();
  const closeSearch = () => {
    dispatch({
      type: 'searchbar/close',
    });
  };

  return (
    <div className={searchbarStyle.container}>
      <div className={searchbarStyle.close}>
        <IoMdClose
          onClick={closeSearch}
          className={searchbarStyle.close_icon}
        />
      </div>
      <div className={searchbarStyle.search__container}>
        <div className={searchbarStyle.search}>
          <FaSearch className={searchbarStyle.search__icon} />
        </div>
        <input
          type="text"
          className={searchbarStyle.search__bar}
          onChange={updateQuery}
        />
      </div>
    </div>
  );
};

export default Searchbar;
