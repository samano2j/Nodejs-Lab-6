const router = require('express').Router()
const { getAllRecipe, getAddRecipePage, postAddRecipe, getEditRecipeById, postEditRecipeById, deleteRecipe, deleteAllRecipe} = require('../controllers/recipe.controller')

router.get('/', getAllRecipe)

router.route('/save').get(getAddRecipePage).post(postAddRecipe)
router.route("/edit/:id").get(getEditRecipeById).post(postEditRecipeById)
router.delete("/delete/:id", deleteRecipe)
router.delete("/delete/", deleteAllRecipe)

module.exports = router