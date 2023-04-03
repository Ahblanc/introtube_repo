import { useRouter } from "next/router";

export default function Category({ category = [] }) {
  const router = useRouter();
  const onCategoryClick = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="h-full border-r-2 border-bblue bg-whiteGray s:w-52 sm:w-72 md:w-96">
      <div className="py-8 text-center border-b cursor-default h-28 border-skybblue s:text-xl sm:text-2xl md:text-3xl">
        Category
      </div>
      <div className="overflow-auto scrollbar-hide h-[calc(100%-7rem)]">
        {category?.map((cate, index) => (
          <div
            key={index}
            className="py-2 text-center border-b cursor-pointer border-skybblue hover:bg-gray-200"
            onClick={() => onCategoryClick(cate)}
          >
            {cate}
          </div>
        ))}
      </div>
    </div>
  );
}
