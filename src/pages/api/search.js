import { Types } from "mongoose";
import dbConnect from "../../../database/dbConnect";
import Channel from "../../../database/schemas/channels";
import Hashtag from "../../../database/schemas/hashtags";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const { search } = req.query;
      const categorysResult = await Hashtag.find({
        hashtag: { $regex: search },
      }).distinct("hashtag");
      const categorys = [];
      categorysResult.forEach((item) => {
        if (item.includes(search)) {
          categorys.push(item);
        }
      });
      const channels = await Channel.find({ title: { $regex: search } });
      res.status(200).json({ categorys, channels });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
}
