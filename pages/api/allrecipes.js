const items = require('./items');

export default async function handler(req, res) {
    res.status(200).json(recipeArray(items))
  }

  function recipeArray(items){
    let recipesArray = [];
    let itemArray = Object.assign([],items);
    itemArray.map(async function(item){
      item.recipes.map(function(recipe){
          recipesArray.push(recipe);
      })
    })
    return Array.from(new Set(recipesArray.map(obj => JSON.stringify(obj)))).map(item => JSON.parse(item));
}