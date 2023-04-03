import { Types } from "mongoose";
import dbConnect from "../../../database/dbConnect";
import Hashtag from "../../../database/schemas/hashtags";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const { yId } = req.query;
      const result = await Hashtag.findOne({ yId });
      if (result) {
        const { hashtag } = result;
        res.status(200).json({ hashtag });
      } else {
        res.status(200).json({ hashtag: [] });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else if (req.method === "PUT") {
    try {
      await dbConnect();
      const { yId, hashtag } = JSON.parse(req.body);
      const tags = [];
      hashtag?.forEach((item) => {
        if (item) {
          tags.push(item);
        }
      });
      const hashtagData = await Hashtag.findOne({ yId });
      let result;
      if (hashtagData) {
        hashtagData.hashtag = hashtag;
        result = await hashtagData.save();
      } else {
        result = await Hashtag.create({
          _id: new Types.ObjectId(),
          yId,
          hashtag: tags,
        });
      }
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, error });
    }
  }
}
