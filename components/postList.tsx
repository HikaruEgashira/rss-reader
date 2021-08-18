import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getHostFromURL, getFaviconSrcFromHostname } from "../lib/helper";

export type PostItem = {
  authorName: string;
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
};

dayjs.extend(relativeTime);

const PostLink: React.FC<{ item: PostItem }> = (props) => {
  const { title, link, dateMiliSeconds } = props.item;

  const hostname = getHostFromURL(link);

  return (
    <article>
      <a href={link}>
        <h2>{title}</h2>
        {hostname && (
          <div>
            <Image
              src={getFaviconSrcFromHostname(hostname)}
              width={14}
              height={14}
              alt="host"
            />
            {hostname}
          </div>
        )}
      </a>
      {dateMiliSeconds && dateMiliSeconds > Date.now() - 86400000 * 3 && (
        <div>NEW</div>
      )}
    </article>
  );
};

export const PostList: React.FC<{ items: PostItem[] }> = (props) => {
  const [displayItemsCount, setDisplayItemsCount] = useState<number>(32);
  const totalItemsCount = props.items?.length || 0;
  const canLoadMore = totalItemsCount - displayItemsCount > 0;

  if (!totalItemsCount) {
    return <div>No posts yet</div>;
  }

  return (
    <>
      <div>
        {props.items.slice(0, displayItemsCount).map((item, i) => (
          <PostLink key={`post-item-${i}`} item={item} />
        ))}
      </div>
      {canLoadMore && (
        <div>
          <button onClick={() => setDisplayItemsCount(displayItemsCount + 32)}>
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
};
