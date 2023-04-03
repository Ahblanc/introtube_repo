import Image from "next/image";
import LinkButton from "./LinkButton";

export default function Card({ info, onDetailClick }) {
  const { yId, title, thumbnails, banner, customUrl, subscriberCount } = info;

  return (
    <div
      key={yId}
      className="p-2 shadow-md h-80 w-80 rounded-xl bg-skybblue hover:bg-skybblueHover hover:cursor-pointer"
      onClick={(event) => onDetailClick(event, yId)}
    >
      <Image
        src={banner}
        alt="banner"
        width={304}
        height={171}
        className="rounded-xl"
      />
      <div className="w-full h-[calc(100%-171px)] pt-2 flex">
        <Image
          src={thumbnails}
          alt="thumbnail"
          width={100}
          height={100}
          className="self-center rounded-xl "
        />
        <div className="h-full w-[calc(100%-100px)] p-2">
          <p className="text-center truncate ... text-lg font-bold place-self-center">
            {title}
          </p>
          <div className="flex justify-between">
            <p className="font-bold">Subscribers</p>
            <p>{Number(subscriberCount).toLocaleString("ko-KR")}</p>
          </div>
          <div className="flex justify-end w-full">
            <LinkButton customUrl={customUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
