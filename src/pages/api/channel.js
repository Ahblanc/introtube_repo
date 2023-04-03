import { Types } from "mongoose";
import dbConnect from "../../../database/dbConnect";
import Channel from "../../../database/schemas/channels";
import Hashtag from "../../../database/schemas/hashtags";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const { category, page, limit } = req.query;
      let result;
      if (category === "home") {
        result = await Channel.find({})
          .sort({
            detailClickCount: "desc",
            title: "desc",
          })
          .skip(page * limit)
          .limit(limit)
          .exec();
      } else {
        const channels = await Hashtag.find({ hashtag: category });
        const channelIds = channels.map((item) => item.yId);
        result = await Channel.find({ yId: channelIds })
          .sort({
            subscriberCount: "desc",
            title: "desc",
          })
          .skip(page * limit)
          .limit(limit)
          .exec();
      }

      if (result.length > 0) {
        res.status(200).json({ channels: result, next: Number(page) + 1 });
      } else {
        res.status(200).json({ channels: [], next: null });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    try {
      await dbConnect();
      const { info, hashtag } = JSON.parse(req.body);
      const result = await Channel.find({ yId: info.yId });
      if (result.length > 0) {
        throw "Channel already added";
      }
      const channelData = {
        _id: new Types.ObjectId(),
        yId: info.yId,
        title: info.title,
        customUrl: info.customUrl,
        subscriberCount: Number(info.subscriberCount.replace(/,/g, "")),
        detailClickCount: 1,
        thumbnails: info.thumbnails,
        banner: info.banner,
      };

      const hashtagData = {
        _id: new Types.ObjectId(),
        yId: info.yId,
        hashtag,
      };

      const channelResult = await Channel.create(channelData);
      const hashtagResult = await Hashtag.create(hashtagData);

      res.status(200).json({ result: true, channelResult, hashtagResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, error });
    }
  } else if (req.method === "PUT") {
    try {
      await dbConnect();
      const { info } = JSON.parse(req.body);
      const channel = await Channel.findOne({ yId: info.yId });
      if (!channel) throw Error("Unregistered channels");

      channel.title = info.title;
      channel.customUrl = info.customUrl;
      channel.subscriberCount = Number(info.subscriberCount.replace(/,/g, ""));
      channel.detailClickCount++;
      channel.thumbnails = info.thumbnails;
      channel.banner = info.banner;
      const channelResult = await channel.save();

      res.status(200).json({ result: true, channelResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, error });
    }
  }
}
