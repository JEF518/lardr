import itemData from "../items";
import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'POST' && req.body !== null) {
    console.log('REQBODY', req.body);
    console.log(typeof itemData);
    let itemArray = Object.assign([], itemData);
    itemArray.push(req.body);
    fs.writeFileSync('pages/data/itemData.json', JSON.stringify(itemArray));
    //require('../data/itemData.json')
    res.status(200).json(JSON.stringify(itemData))
  }
  else {
    return null;
  }
  }