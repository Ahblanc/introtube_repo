import { useRef, useState } from "react";

export default function CommentInput({ yId, commentPost }) {
  const [comment, setComment] = useState("");
  const commentInput = useRef();

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const onEnter = (event) => {
    if (event.key === "Enter") {
      onCommitClick();
    }
  };

  const onCommitClick = async () => {
    const { result } = await (
      await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ yId, comment }),
      })
    ).json();

    if (result) {
      commentPost(result.comment);
      setComment("");
      commentInput.current.value = "";
    } else {
      alert("Data was not processed normally. Please try again later.");
    }
  };

  return (
    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
      <div className="px-4 py-2 bg-white rounded-t-lg ">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          ref={commentInput}
          rows="3"
          className="w-full px-0 text-sm text-gray-900 bg-white border-0 resize-none focus:ring-0"
          placeholder="Write a comment..."
          onChange={(event) => onCommentChange(event)}
          onKeyDown={(event) => onEnter(event)}
        ></textarea>
      </div>
      <div className="flex flex-row-reverse items-center px-3 py-2 border-t ">
        <button
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-bblue hover:bg-bblueHover rounded-lg focus:ring-4 focus:ring-blue-200 "
          onClick={() => onCommitClick()}
        >
          Post comment
        </button>
      </div>
    </div>
  );
}
