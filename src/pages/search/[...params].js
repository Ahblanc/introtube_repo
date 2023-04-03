import { useRouter } from "next/router";
import SearchResult from "../../../components/SearchResult";
import Seo from "../../../components/Seo";

const BASEPATH = process.env.BASEPATH;

export default function Search({ search, categorys, channels }) {
  const router = useRouter();

  const onCategoryClick = (category) => {
    router.push(`/category/${category}`);
  };

  const onChannelClick = (yId) => {
    router.push(`/detail/${yId}`);
  };

  if (search === "error") {
    return (
      <div className="w-full h-full p-4">
        <Seo title="Search" />
        <p className="h-8 text-2xl font-bold">
          Search error. Please try again later.
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full p-4">
        <Seo title="Search" />
        <p className="h-8 text-2xl font-bold">{`"${search}" Search Result...`}</p>
        <div className="p-4 grid h-[calc(100%-2rem)] grid-rows-2">
          <div>
            <p className="font-mono text-xl font-bold">Category</p>
            <SearchResult
              type="category"
              results={categorys}
              onResultsClick={onCategoryClick}
            />
          </div>
          <div>
            <p className="font-mono text-xl font-bold">Channel</p>
            <SearchResult
              type="channel"
              results={channels}
              onResultsClick={onChannelClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ params: { params } }) {
  try {
    const [search] = params || [];

    const { channels, categorys } = await (
      await fetch(`${BASEPATH}/api/search/${search}`)
    ).json();

    return {
      props: {
        search,
        categorys,
        channels,
      },
    };
  } catch (error) {
    return {
      props: {
        search: "error",
        categorys: [],
        channels: [],
      },
    };
  }
}
