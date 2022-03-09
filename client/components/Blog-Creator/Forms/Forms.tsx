import form__style from './forms.module.css';
import Content from './Content/Content';
import Upload from './Media/Upload/Uploader';
const Forms = () => {
  return (
    <div className={form__style.container}>
      <div className={form__style.editor_container}>
        <Upload />
        <Content></Content>
      </div>
    </div>
  );
};

export default Forms;
