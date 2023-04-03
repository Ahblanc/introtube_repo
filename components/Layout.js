import Category from "./Category";
import NavBar from "./NavBar";

export default function Layout({ children, category }) {
  return (
    <>
      <NavBar />
      <div className="flex h-[calc(100%-4rem)]">
        <Category category={category} />
        <div className="w-full h-full overflow-auto scrollbar-hide bg-whiteGray">
          {children}
        </div>
      </div>
    </>
  );
}
