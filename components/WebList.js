import { useRouter } from "next/router";
import Card from "./Card";

export default function WebList({ list }) {
  const router = useRouter();

  const onDetailClick = (event, yId) => {
    if (event.target.name !== "LinkButton") router.push(`/detail/${yId}`);
  };

  let channels = [];
  list.forEach((element) => {
    channels = [...channels, ...element.channels];
  });

  return (
    <div className="flex flex-wrap w-full h-full gap-6 p-4">
      {channels?.map((item) => (
        <Card info={item} onDetailClick={onDetailClick} key={item.yId} />
      ))}
    </div>
  );
}
