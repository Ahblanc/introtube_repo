import Image from "next/image";
import { useRef, useState } from "react";
import { channelDataParse, youtuberDataParse } from "../../common/parse";
import Seo from "../../components/Seo";

const INFOINIT = {
  yId: "",
  title: "",
  description: "",
  publishedAt: "",
  customUrl: "",
  thumbnails: "",
  viewCount: "",
  subscriberCount: "",
  videoCount: "",
  banner: "",
};

export default function Add({ onCategoryChange }) {
  const channelInput = useRef();
  const hashtagInput = useRef();
  const [info, setInfo] = useState(INFOINIT);
  const [visible, setVisible] = useState("hidden");

  const onEnter = (event) => {
    if (event.key === "Enter") {
      onCommit();
    }
  };

  const onCommit = async () => {
    let hashtag = hashtagInput.current.value
      ?.replace(/\s|\#|\&/g, "")
      .toUpperCase()
      .split(",");

    if (hashtag.length === 1 && hashtag[0] === "") hashtag = [];

    const postData = {
      info,
      hashtag,
    };

    const { result, error } = await (
      await fetch("/api/channel", {
        method: "POST",
        body: JSON.stringify(postData),
      })
    ).json();

    if (result) {
      onCategoryChange();
      setInfo(INFOINIT);
      setVisible("hidden");
      channelInput.current.value = "";
      hashtagInput.current.value = "";
      alert("Commit Success!");
    } else {
      if (error === "Channel already added") {
        setInfo(INFOINIT);
        setVisible("hidden");
        channelInput.current.value = "";
        hashtagInput.current.value = "";
        alert(error);
      } else {
        alert("Data was not processed normally. Please try again later.");
      }
    }
  };

  const onChannelEnter = async (event) => {
    if (event.key === "Enter") {
      const videoIdArr = channelInput.current.value?.split("?");
      if (videoIdArr.length <= 1 || videoIdArr.length > 2) {
        alert("Please check the video url and re-enter it");
        return;
      }
      const options = videoIdArr[1].split("&");
      // if (options.length > 1) {
      //   alert("Please check the video url and re-enter it");
      //   return;
      // }
      const videoId = options[0].substring(2, options[0].length);

      try {
        const videoResult = await (await fetch(`/api/video/${videoId}`)).json();
        const channelId = await channelDataParse(videoResult);

        const channelResult = await (
          await fetch(`/api/detail/${channelId}`)
        ).json();
        setInfo(await youtuberDataParse(channelResult));
        setVisible("grid");
      } catch (error) {
        alert("Please check the video url and re-enter it");
      }
    }
  };

  return (
    <div className="w-full p-12 overflow-auto scrollbar-hide">
      <Seo title="Youtuber Add" />
      <div className="w-full h-full p-6 shadow-md rounded-xl bg-skybblue">
        <div className="h-full">
          <div className="grid grid-cols-2 pb-5 border-b-2">
            <div>
              <label className="text-xl font-semibold">
                How to add Channel
              </label>
              <p className="mt-2">
                1. Play the video which you want to add in Youtube browser. (Not
                Shorts)
              </p>
              <p className="mt-2">2. Copy the URL.</p>
              <Image
                className="mt-2"
                src="/urlCopyEx.png"
                alt="urlCopyExample"
                width={400}
                height={400}
              />
              <p className="mt-2">
                3. Paste the copied URL into the input box and press Enter.
              </p>
              <input
                ref={channelInput}
                className="h-12 px-3 py-2 mr-3 leading-tight text-gray-700 border rounded shadow appearance-none w-128 focus:outline-none focus:shadow-outline"
                onKeyDown={(event) => onChannelEnter(event)}
              />
            </div>
            <div>
              <label className="text-xl font-semibold">
                How to add Category(Hashtag)
              </label>
              <p className="mt-2">1. Enter the YouTube URL on the left.</p>
              <p className="mt-2">
                2. Enter the hashtag of the channel in the hashtag text box
                among the YouTube information below.
              </p>
              <p className="mt-2">3. Click the Commit button.</p>
            </div>
          </div>
          <div className={`${visible} grid-cols-8 gap-4 mt-5`}>
            <div className="relative inline-block col-span-2 row-span-1 m-0 overflow-hidden rounded-xl">
              <Image src={info.thumbnails} alt="thumbnail" fill />
            </div>
            <div className="grid col-span-6 gap-2 p-2 grid-rows-8">
              <p className="text-4xl font-bold place-self-center">
                {info.title}
              </p>
              <div className="row-span-2">
                <label className="text-xl font-semibold">Description</label>
                <p className="mt-2">{info.description}</p>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <label className="text-xl font-semibold">
                    Published Date
                  </label>
                  <p className="mt-2">{info.publishedAt}</p>
                </div>
                <div>
                  <label className="text-xl font-semibold">
                    Subscriber Count
                  </label>
                  <p className="mt-2">{info.subscriberCount}</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <label className="text-xl font-semibold">View Count</label>
                  <p className="mt-2">{info.viewCount}</p>
                </div>
                <div>
                  <label className="text-xl font-semibold">Video Count</label>
                  <p className="mt-2">{info.videoCount}</p>
                </div>
              </div>
              <div className="row-span-2">
                <label className="text-xl font-semibold ">Hashtag</label>
                <div
                  className={`px-4 py-2 mt-1 bg-white rounded-lg dark:bg-gray-800`}
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
                  className="px-4 py-3 mr-3 font-bold text-white rounded-lg place-self-end bg-bblue hover:bg-bblueHover disabled:bg-gray-400"
                  onClick={() => onCommit()}
                >
                  Commit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
