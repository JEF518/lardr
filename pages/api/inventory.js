import itemData from "./items.js";
export default function handler(req, res) {
    res.status(200).json(itemData)
  }
