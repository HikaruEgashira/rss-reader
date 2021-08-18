import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import urlRegex from "url-regex";

export default function Home() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [validForm, setValidForm] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const isValid = urlRegex({ exact: true }).test(value);

    setText(value);
    setValidForm(isValid);
    setDisabled(isValid);
  };

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
            <span className="label-text">feed URLを入力してください</span>
          </label>
          <input
            className={`input input-bordered ${validForm ? "" : "input-error"}`}
            placeholder="https://www.tsukuba.ac.jp/news/feed"
            type="text"
            value={text}
            onChange={onChangeInput}
          />
          <button
            className="btn btn-primary"
            disabled={!disabled}
            onClick={() => router.push(`feed?url=${text}`)}
          >
            view
          </button>
        </div>
      </main>
    </div>
  );
}
