import { useEffect, useState } from "react";
import { youtuberDataParse } from "../../../common/parse";
import Comment from "../../../components/Comment";
import CommentInput from "../../../components/CommentInput";
import MobileDetailCard from "../../../components/MobileDetailCard";
import Seo from "../../../components/Seo";

const BASEPATH = process.env.BASEPATH;

export default function Detail({
  data,
  hashtag,
  comment: { comment = [] },
  onCategoryChange,
}) {
  const [comments, setComments] = useState(comment);

  const commentsChange = (newComments) => {
    setComments(newComments);
  };

  if (data) {
    return (
      <div className="w-full h-full p-2 overflow-auto scrollbar-hide">
        <Seo title={data.title} />
        <MobileDetailCard
          info={data}
          hashtag={hashtag}
          onCategoryChange={onCategoryChange}
        />
        <div className="h-2 my-2 border-b"></div>
        <div></div>
        <CommentInput yId={data.yId} commentPost={commentsChange} />
        <div>
          {comments?.map((item, index) => (
            <Comment key={index} comment={item} />
          ))}
        </div>
      </div>
    );
  } else {
    return "data error.";
  }
}

export async function getServerSideProps({ params: { params } }) {
  try {
    const [yId] = params || [];

    const data = await youtuberDataParse(
      await (await fetch(`${BASEPATH}/api/detail/${yId}`)).json()
    );

    const hashtag = await (
      await fetch(`${BASEPATH}/api/hashtag/${yId}`)
    ).json();

    const comment = await (
      await fetch(`${BASEPATH}/api/comment/${yId}`)
    ).json();

    const putData = {
      yId,
      title: data.title,
      description: data.description,
      customUrl: data.customUrl,
      thumbnails: data.thumbnails,
      subscriberCount: data.subscriberCount,
      banner: data.banner,
    };

    const update = await (
      await fetch(`${BASEPATH}/api/channel`, {
        method: "PUT",
        body: JSON.stringify({ info: putData }),
      })
    ).json();

    return {
      props: {
        data,
        hashtag,
        comment,
      },
    };
  } catch (error) {
    return {
      props: {
        data: {},
        hashtag: [],
        comment: [],
      },
    };
  }
}
