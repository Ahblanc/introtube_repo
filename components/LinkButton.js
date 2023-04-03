export default function LinkButton({ customUrl = "" }) {
  const url = `https://www.youtube.com/${customUrl}`;
  const onClick = () => {
    window.open(url);
  };

  return (
    <button
      name="LinkButton"
      className="font-bold text-white rounded-lg s:px-3 s:py-2 s:mr-0 s:mt-2 md:px-4 md:py-3 md:mr-3 place-self-end bg-bblue hover:bg-bblueHover"
      onClick={() => onClick()}
    >
      Go
    </button>
  );
}
