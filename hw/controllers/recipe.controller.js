const Recipe = require('../models/recipe')

const getAllRecipe = async (req,res,next) => {
    try {
        recipeData = await Recipe.fetchAllRecipes()
        res.render('recipes', { recipes: recipeData, title: "Recipe List" })
    } catch (err) {
        res.render('error', { title: "Something went wrong", message: err.message })
    }
}

const getAddRecipePage = (req,res,next) => {
    res.render('create', { title: "New Recipe" })
}

const postAddRecipe = async (req,res,next) => {
    let {name, ingredient, instruction, quantity} = req.body

    if(!Array.isArray(ingredient)){
        ingredient = [ingredient]
        quantity = [quantity]
    }

    if(!Array.isArray(instruction)){
        instruction = [instruction]
    }

    const ingredients = ingredient.map((ing, i) => {
        //ingredient ---> ['flour', 'sugar', 'butter']
        //quantity ---> ['1 cup', '4 cups', '1 bar']
        return { name: ing, quantity: quantity[i] }
    })

    const newRecipe = new Recipe(name, ingredients, instruction)

    try {
        const result = await newRecipe.save(); 
        return res.redirect('/recipes');
    } catch (error) {
        res.render('error', { title: "Something went wrong", message: error.message });
    }
}

const getEditRecipeById = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
      .then((rows) => {
        res.render("edit", { recipes: rows[0], title: 'Update Recipe' });
      })
      .catch((err) => console.error(err.message));
}

const postEditRecipeById = (req, res) => {
    const id = req.params.id;
   

    let {name, ingredient, instruction, quantity} = req.body
    if(!Array.isArray(ingredient)){
        ingredient = [ingredient]
        quantity = [quantity]
    }

    if(!Array.isArray(instruction)){
        instruction = [instruction]
    }

    const ingredients = ingredient.map((ing, i) => {
        //ingredient ---> ['flour', 'sugar', 'butter']
        //quantity ---> ['1 cup', '4 cups', '1 bar']
        return { name: ing, quantity: quantity[i] }
    })

    const dataToUpdate = { id, name, ingredients, instruction}
    Recipe.updateOne(dataToUpdate).then(() => {
        res.redirect("/recipes")
    }).catch((err) => console.error(err.message))

}

const deleteRecipe = (req, res) => {
    const id = req.params.id;

    Recipe.deleteOne(id).then(() => {
        res.redirect("/recipes")
    }).catch((err) => console.error(err.message))
}

const deleteAllRecipe = (req, res) => {
    Recipe.deleteAll().then(() => {
        res.redirect("/recipes")
    }).catch((err) => console.error(err.message))
}

module.exports = {
    getAllRecipe,
    getAddRecipePage,
    postAddRecipe,
    getEditRecipeById,
    postEditRecipeById,
    deleteRecipe,
    deleteAllRecipe
}