import { useRouter } from "next/router";
import { useAsync } from "react-use";
import Parser from "rss-parser";

import { PostItem, PostList } from "../components/postList";

const parser = new Parser();

const Post = () => {
  const router = useRouter();
  const { url } = router.query;

  const { value } = useAsync(async () => {
    const data = await parser.parseURL(String(url));
    return data.items as PostItem[];
  }, [url]);

  if (!value) {
    return <div>loading</div>;
  }

  return (
    <div>
      <p>Post: {url}</p>
      <PostList items={value}></PostList>
    </div>
  );
};

export default Post;
