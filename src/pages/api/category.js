import dbConnect from "../../../database/dbConnect";
import Hashtag from "../../../database/schemas/hashtags";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const result = await Hashtag.find().distinct("hashtag");
    result.sort((a, b) => a.localeCompare(b, "kr", { sensitivity: "base" }));
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
