import navbar_style from './navbar.module.css';
import { HiMenu } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { open, close } from 'components/Searchbox/search-slice';
const Navbar = () => {
  const dispatch = useAppDispatch();
  const visible = useAppSelector(({ showSearch }) => showSearch);
  const toggleSearch = () => {
    !visible ? dispatch(open()) : dispatch(close());
  };
  return (
    <div className={navbar_style.container}>
      <button className={navbar_style.icon} onClick={toggleSearch}>
        <HiMenu />
      </button>
    </div>
  );
};

export default Navbar;
