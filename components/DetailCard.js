import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import LinkButton from "./LinkButton";

export default function DetailCard({
  info,
  hashtag: { hashtag = [] },
  onCategoryChange,
}) {
  const [active, setActive] = useState(true);
  const [tagVisible, setTagVisible] = useState("");
  const [tagInputVisible, setTagInputVisible] = useState("hidden");
  const [tag, setTag] = useState(
    hashtag?.sort((a, b) => a.localeCompare(b, "kr", { sensitivity: "base" }))
  );
  const hashtagInput = useRef();
  const router = useRouter();

  const {
    yId,
    title,
    description,
    publishedAt,
    customUrl,
    thumbnails,
    viewCount,
    subscriberCount,
    videoCount,
    banner,
  } = info;

  const onEnter = (event) => {
    if (event.key === "Enter") {
      onSaveClick();
    }
  };

  const onUpdateClick = () => {
    setActive(false);
    setTagVisible("hidden");
    setTagInputVisible("");
    hashtagInput.current.value = tag?.join(", ");
  };

  const onSaveClick = async () => {
    let hashtag = hashtagInput.current.value
      ?.replace(/\s|\#|\&/g, "")
      .toUpperCase()
      .split(",");

    if (hashtag.length === 1 && hashtag[0] === "") hashtag = [];

    const putData = {
      yId,
      hashtag,
    };

    const { result } = await (
      await fetch("/api/hashtag", {
        method: "PUT",
        body: JSON.stringify(putData),
      })
    ).json();

    if (result) {
      onCategoryChange();
      setTag(hashtag);
      setActive(true);
      setTagVisible("");
      setTagInputVisible("hidden");
    } else {
      alert("Data was not processed normally. Please try again later.");
    }
  };

  const onHashtagClick = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="w-full h-full p-6 shadow-md rounded-xl bg-skybblue">
      <div className="grid h-full grid-cols-8 gap-4">
        <div className="relative col-span-2 row-span-1 m-0 overflow-hidden rounded-xl">
          <Image src={thumbnails} alt="thumbnail" fill />
        </div>
        <div className="grid col-span-6 gap-2 p-2 grid-rows-8">
          <p className="text-4xl font-bold place-self-center">{title}</p>
          <div className="row-span-2">
            <label className="text-xl font-semibold">Description</label>
            <p className="mt-2">{description}</p>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <label className="text-xl font-semibold">Published Date</label>
              <p className="mt-2">{publishedAt}</p>
            </div>
            <div>
              <label className="text-xl font-semibold">Subscriber Count</label>
              <p className="mt-2">{subscriberCount}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <label className="text-xl font-semibold">View Count</label>
              <p className="mt-2">{viewCount}</p>
            </div>
            <div>
              <label className="text-xl font-semibold">Video Count</label>
              <p className="mt-2">{videoCount}</p>
            </div>
          </div>
          <div id="hashtagDiv" className="row-span-2">
            <label className="text-xl font-semibold ">Hashtag</label>
            <div className={`flex flex-wrap ${tagVisible}`}>
              {tag?.map((item, index) => (
                <div
                  key={index}
                  className="mx-1 hover:text-gray-500 hover:cursor-pointer"
                  onClick={() => onHashtagClick(item)}
                >{`#${item}`}</div>
              ))}
            </div>
            <div
              className={`px-4 py-2 mt-1 bg-white rounded-lg dark:bg-gray-800 ${tagInputVisible}`}
            >
              <textarea
                ref={hashtagInput}
                rows={3}
                placeholder={`Separate hashtags with ","`}
                className="w-full px-0 text-sm text-gray-900 bg-white border-0 resize-none dark:bg-gray-800 focus:ring-0"
                onKeyDown={(event) => onEnter(event)}
              ></textarea>
            </div>
          </div>
          <div className="place-self-end">
            <button
              id="saveButton"
              className="px-4 py-3 mr-3 font-bold text-white rounded-lg place-self-end bg-bblue hover:bg-bblueHover disabled:bg-gray-400"
              onClick={() => onSaveClick()}
              disabled={active}
            >
              Save
            </button>
            <button
              className="px-4 py-3 mr-3 font-bold text-white rounded-lg place-self-end bg-bblue hover:bg-bblueHover disabled:bg-gray-400"
              onClick={() => onUpdateClick()}
              disabled={!active}
            >
              Update
            </button>
            <LinkButton customUrl={customUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
