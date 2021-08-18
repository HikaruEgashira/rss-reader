import { useRouter } from "next/router";
import { useAsync } from "react-use";
import Link from "next/link";
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
    return (
      <div className="px-4 py-10 text-center text-opacity-70">loading</div>
    );
  }

  return (
    <main className="px-4 py-10 bg-base-200 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="py-3 px-5 hover:line-through">
          <Link href="/">← 戻る</Link>
        </div>
        <PostList items={value} title={`${url}`}></PostList>
      </div>
    </main>
  );
};

export default Post;
