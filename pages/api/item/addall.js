import itemData from "../items";
import fs from 'fs';

export default function handler(req, res) {
  //  console.log(req.body);
  if (req.method === 'POST' && req.body !== null) {
    
    fs.writeFileSync('pages/data/itemData.json', JSON.stringify(req.body));
    //require('../data/itemData.json')
    res.status(200).json(JSON.stringify(itemData))
  }
  else {
    return null;
  }
  }