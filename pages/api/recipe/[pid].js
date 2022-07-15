const axios = require('axios');
const items = require('../items');

export default async function handler(req, res) {
    const { pid } = req.query
   // console.log(`Post: ${pid}`)
    const promise = await axios.get("http://localhost:3000/api/allrecipes");
    const status = promise.status;
    //console.log(status);
    if (status === 200) {
      const data = promise.data;
      let itemArray = Object.assign([], items);
      let ingredients = await getIngredients(itemArray, pid);
      let recipeInStock = await isRecipeInStock(ingredients);
      console.log(recipeInStock);
      const result = {name : pid,
    ingredients: ingredients,
    inStock: recipeInStock};
  //  console.log(result);
      res.status(200).json(result)
    }
  }

  async function getIngredients(items, recipe) {
    let ingredients = [];
    await items.map(async function(item){
        if(item.recipes.includes(recipe)){
          let itemObj = {
            item: item.name,
            inStock: item.amount ? 'inStock' : 'notInStock'
          }
            ingredients.push(itemObj);
        }
    })
    return ingredients;
}

async function isRecipeInStock(ingredients) {
  let inStock = true;
  let ingredientsArray = Object.assign([], ingredients);
  ingredientsArray.forEach((ingredient) => {
  if (ingredient.inStock === 'notInStock') {
    inStock = false;
  }})
  return inStock;
}