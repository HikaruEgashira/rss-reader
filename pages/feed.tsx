import { useRouter } from "next/router";
import Link from "next/link";
import useSwr from "swr";
import { NextPage } from "next";
import { PostItem, PostList } from "../components/postList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Post: NextPage = () => {
  const router = useRouter();
  const { url } = router.query;

  const { data } = useSwr<PostItem[]>(
    url ? `/api/rss?url=${url}` : null,
    fetcher
  );

  if (!data) {
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
        <PostList items={data} title={`${url}`}></PostList>
      </div>
    </main>
  );
};

export default Post;
