import { useRouter } from "next/router";
import MobileCard from "./MobileCard";

export default function MobileList({ list }) {
  const router = useRouter();
  const onDetailClick = (event, yId) => {
    if (event.target.name !== "LinkButton") router.push(`/mobileDetail/${yId}`);
  };

  let channels = [];
  list.forEach((element) => {
    channels = [...channels, ...element.channels];
  });

  return (
    <div className="grid w-full h-full grid-cols-1 gap-2 p-2">
      {channels?.map((item) => (
        <MobileCard info={item} onDetailClick={onDetailClick} key={item.yId} />
      ))}
    </div>
  );
}
