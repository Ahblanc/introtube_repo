import { useRef } from "react";
import MobileList from "../../components/MobileList";
import Seo from "../../components/Seo";
import WebList from "../../components/WebList";
import { useInfiniteQuery } from "react-query";
import { useObserver } from "../../common/useObserver";

export default function Home() {
  const OFFSET = 30;
  const bottom = useRef(null);

  const getChannelList = async ({ pageParam = 0 }) => {
    const channels = await (
      await fetch(`/api/channel/home?limit=${OFFSET}&page=${pageParam}`)
    ).json();
    return channels;
  };

  const result = useInfiniteQuery("channels", getChannelList, {
    getNextPageParam: (lastPage) => {
      const { next } = lastPage;
      if (!next) return undefined;
      return next;
    },
  });

  const onIntersect = ([entry]) =>
    entry.isIntersecting && result.fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <div className="w-full h-full">
      <Seo title="Home" />
      <div className="s:hidden md:block">
        {result.status === "success" && <WebList list={result.data.pages} />}
      </div>
      <div className="s:block md:hidden">
        {result.status === "success" && <MobileList list={result.data.pages} />}
      </div>
      <div ref={bottom} />
    </div>
  );
}
