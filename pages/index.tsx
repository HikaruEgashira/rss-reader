import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import urlRegex from "url-regex";

export default function Home() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [validForm, setValidForm] = useState(true);

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const isValid = urlRegex({ exact: true }).test(text);

    setText(value);
    setValidForm(isValid);
  };

  const feedList = [
    "https://www.tsukuba.ac.jp/news/feed",
    "https://www.coins.tsukuba.ac.jp/feed",
  ];

  return (
    <div>
      <Head>
        <title>Next Feed App</title>
        <meta name="description" content="visualize rss feed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4 py-10 text-center bg-base-200 min-h-screen">
        <div className="grid gap-4 max-w-5xl mx-auto">
          <label className="label">
            <span className="label-text">フィードのURLを入力してください</span>
          </label>
          <input
            className={`input input-bordered ${validForm ? "" : "input-error"}`}
            placeholder={feedList[Math.round(Math.random() * feedList.length)]}
            type="text"
            value={text}
            onChange={onChangeInput}
          />
          <button
            className="btn btn-primary"
            disabled={!validForm || text === ""}
            onClick={() => router.push(`feed?url=${text}`)}
          >
            view
          </button>
          <ul className="menu py-3">
            <li className="menu-title">
              <span>おすすめフィード</span>
            </li>
            {feedList.map((feed, i) => (
              <li key={`recomend-feed-${i}`} onClick={() => setText(feed)}>
                <a>{feed}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
