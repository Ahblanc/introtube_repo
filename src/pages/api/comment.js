import { Types } from "mongoose";
import dbConnect from "../../../database/dbConnect";
import Comment from "../../../database/schemas/comments";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const { yId } = req.query;
      const result = await Comment.find({ yId });
      if (result.length > 0) {
        const [{ comment }] = result;
        res.status(200).json({ comment });
      } else {
        res.status(200).json({ comment: [] });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    try {
      await dbConnect();
      const { yId, comment } = JSON.parse(req.body);
      const commentData = await Comment.findOne({ yId });
      let result;
      if (commentData) {
        commentData.comment.push(comment);
        result = await commentData.save();
      } else {
        result = await Comment.create({
          _id: new Types.ObjectId(),
          yId,
          comment: [comment],
        });
      }
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, error });
    }
  }
}
