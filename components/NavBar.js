import { useRouter } from "next/router";
import Image from "next/image";
// import Profile from "./Profile";
import Search from "./Search";

export default function NavBar() {
  const router = useRouter();
  const onHomeClick = () => {
    router.push(`/`);
  };

  const onAddClick = () => {
    router.push(`/add`);
  };

  return (
    <nav className="flex justify-between h-16 border-b-2 bg-whiteGray border-bblue">
      <div className="flex self-center ml-3 ">
        <Image
          src="/intro.png"
          alt="logo"
          width={64}
          height={64}
          className="cursor-pointer"
          onClick={() => onHomeClick()}
        />
        <p
          className="self-center font-sans text-2xl cursor-pointer s:hidden md:block"
          onClick={() => onHomeClick()}
        >
          Introtube
        </p>
      </div>
      <div className="flex">
        <Search />
        {/* <Profile /> */}
        <button
          className="self-center px-4 py-3 mr-3 font-bold text-white rounded-lg bg-bblue hover:bg-bblueHover s:hidden md:block"
          onClick={() => onAddClick()}
        >
          Add
        </button>
      </div>
    </nav>
  );
}
