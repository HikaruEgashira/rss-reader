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
    <main className="px-4 py-10 bg-base-200 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <PostList items={value} title={`${url}`}></PostList>
      </div>
    </main>
  );
};

export default Post;
