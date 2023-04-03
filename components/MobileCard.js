import Image from "next/image";
import LinkButton from "./LinkButton";

export default function Card({ info, onDetailClick }) {
  const { yId, title, thumbnails, customUrl, subscriberCount } = info;
  return (
    <div
      key={yId}
      className="m-2 w-[calc(100%-1rem)] h-28 p-3 shadow-md rounded-xl bg-skybblue hover:bg-skybblueHover hover:cursor-pointer flex"
      onClick={(event) => onDetailClick(event, yId)}
    >
      <Image
        src={thumbnails}
        alt="thumbnail"
        width={80}
        height={80}
        className="rounded-xl"
      />
      <div className="h-full w-[calc(100%-84px)] pl-2">
        <p className="text-center font-bold text-sm truncate ...">{title}</p>
        <p className="text-center text-sm truncate ...">
          {Number(subscriberCount).toLocaleString("ko-KR")}
        </p>
        <div className="flex justify-end w-full">
          <LinkButton customUrl={customUrl} />
        </div>
      </div>
    </div>
  );
}
