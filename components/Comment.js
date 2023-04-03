export default function Comment({ comment }) {
  return (
    <article className="p-6 mb-6 text-base bg-white rounded-lg ">
      <footer className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <p className="text-sm text-gray-600">
            {/* <time pubdate datetime="2022-02-08" title="February 8th, 2022">
              Feb. 8, 2022
            </time> */}
          </p>
        </div>
      </footer>
      <p className="text-gray-500">{comment}</p>
    </article>
  );
}
