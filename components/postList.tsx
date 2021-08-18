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
    <li>
      <a className="grid gap-2" href={link} target="_blank" rel="noreferrer">
        {hostname && (
          <div className="text-right">
            <Image
              src={getFaviconSrcFromHostname(hostname)}
              width={14}
              height={14}
              alt="icon"
            />
          </div>
        )}
        <h2>{title}</h2>
        {dateMiliSeconds && dateMiliSeconds > Date.now() - 86400000 * 3 && (
          <div className="text-accent">NEW</div>
        )}
      </a>
    </li>
  );
};

export const PostList: React.FC<{ items: PostItem[]; title: string }> = (
  props
) => {
  const [displayItemsCount, setDisplayItemsCount] = useState(32);
  const totalItemsCount = props.items?.length || 0;
  const canLoadMore = totalItemsCount - displayItemsCount > 0;

  if (!totalItemsCount) {
    return <div>No posts yet</div>;
  }

  return (
    <>
      <ul className="menu py-3">
        <li className="menu-title">
          <span>{props.title}</span>
        </li>
        {props.items.slice(0, displayItemsCount).map((item, i) => (
          <PostLink key={`post-item-${i}`} item={item} />
        ))}
      </ul>
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
