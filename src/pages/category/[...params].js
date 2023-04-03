import Seo from "../../../components/Seo";
import WebList from "../../../components/WebList";
import MobileList from "../../../components/MobileList";
import { useObserver } from "../../../common/useObserver";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

export default function Category({ category = "" }) {
  const OFFSET = 30;
  const bottom = useRef(null);

  const getChannelList = async ({ pageParam = 0 }) => {
    const channels = await (
      await fetch(`/api/channel/${category}?limit=${OFFSET}&page=${pageParam}`)
    ).json();
    return channels;
  };

  const result = useInfiniteQuery("channels", getChannelList, {
    getNextPageParam: (lastPage, page) => {
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

  useEffect(() => {
    result.refetch();
  }, [category]);

  return (
    <div className="w-full h-full">
      <Seo title={category} />
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

export async function getServerSideProps({ params: { params } }) {
  try {
    const [category] = params || [];

    return {
      props: {
        category,
      },
    };
  } catch (error) {
    return {
      props: {
        category: "",
      },
    };
  }
}
