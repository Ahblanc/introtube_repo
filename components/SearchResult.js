export default function SearchResult({ type, results, onResultsClick }) {
  if (type === "category") {
    return (
      <div className="w-full h-[calc(100%-2rem)] rounded-lg border-2 border-bblue p-2 overflow-auto scrollbar-hide ">
        {results?.map((item, index) => (
          <div
            key={index}
            className="h-10 py-2 border-b rounded-lg cursor-pointer border-skybblue align-middlew-full hover:bg-gray-200"
            onClick={() => onResultsClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  } else if (type === "channel") {
    return (
      <div className="w-full h-[calc(100%-2rem)] rounded-lg border-2 border-bblue p-2 overflow-auto scrollbar-hide ">
        {results?.map((item, index) => (
          <div
            key={index}
            className="h-10 py-2 border-b rounded-lg cursor-pointer border-skybblue align-middlew-full hover:bg-gray-200"
            onClick={() => onResultsClick(item.yId)}
          >
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}
