import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import LinkButton from "./LinkButton";

export default function MobileDetailCard({ info, hashtag: { hashtag = [] } }) {
  const [tag, setTag] = useState(
    hashtag?.sort((a, b) => a.localeCompare(b, "kr", { sensitivity: "base" }))
  );
  const router = useRouter();

  const { title, description, customUrl, subscriberCount, banner } = info;

  const onHashtagClick = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="w-full p-2 shadow-md h-120 rounded-xl bg-skybblue">
      <p className="text-xl font-bold text-center">{title}</p>
      <Image
        src={banner}
        alt="banner"
        width={500}
        height={500}
        className="mt-2 rounded-lg"
      />
      <div className="w-full mt-2 overflow-auto h-28 scrollbar-hide">
        <label className="text-lg font-semibold">Description</label>
        <p className="text-sm ">{description}</p>
      </div>
      <div className="w-full mt-2 ">
        <label className="mt-2 text-lg font-semibold">Subscriber Count</label>
        <p className="text-sm">{subscriberCount}</p>
      </div>
      <div className="w-full h-16z` mt-2 overflow-auto scrollbar-hide">
        <label className="text-lg font-semibold ">Hashtag</label>
        <div className={`flex flex-wrap`}>
          {tag?.map((item, index) => (
            <div
              key={index}
              className="mx-1 hover:text-gray-500 hover:cursor-pointer"
              onClick={() => onHashtagClick(item)}
            >{`#${item}`}</div>
          ))}
        </div>
      </div>
      <div className="flex justify-end w-full">
        <LinkButton customUrl={customUrl} />
      </div>
    </div>
  );
}
