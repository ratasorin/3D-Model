import ReactLoading from 'react-loading';
import loadingStyles from './loading.module.css';
const Loading = () => {
  return (
    <div className={loadingStyles.container}>
      <ReactLoading
        type="spokes"
        color="#1d2533"
        height={100}
        width={100}
      ></ReactLoading>
    </div>
  );
};

export default Loading;
