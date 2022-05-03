import Header from 'components/Blog-Creator/Header/Header';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import Blog from 'components/Widgets/Modals/Blogs/Blog/Blog';
import Card from 'components/Widgets/Modals/Blogs/Card/Card';
import { useBlogs } from 'hooks/useBlogs';
import { useRouter } from 'next/router';
import { dateFrom } from 'utils/date';
import { descriptionFrom } from 'utils/description-from-content';
import cerc__style from './cerc-de-lectura.module.css';
const CercDeLectura = () => {
  const blogs = useBlogs('cerc de lectura');
  const router = useRouter();
  return (
    <>
      <div className={cerc__style.container}>
        <Header
          monument="Cerc de lectura"
          subtitle="Arhiva culturala"
          Button={
            <Dispatch
              action={() => {
                router.push(`create-blog/Cerc de lectura`);
              }}
              payload="SCRIETI O POSTARE"
            />
          }
        />
        <div className={cerc__style.posts}>
          {blogs?.map((blog) => (
            <Card
              style={{
                maxWidth: '25rem',
              }}
              authorID={blog.userId}
              blogID={blog.blogId}
              description={descriptionFrom(blog.content)}
              date={dateFrom(blog.createdAt)}
              likes={blog.likeCount}
              monument="cerc de lectura"
              rawContent={blog.content}
              key={blog.content}
              title={blog.title}
              golden={false}
            />
          ))}
        </div>
      </div>
      <Blog />
    </>
  );
};

export default CercDeLectura;
