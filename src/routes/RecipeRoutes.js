/* Author: Anuj Dawar, Sagar */

const express = require("express");
const multer = require("multer");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  likeRecipe,
  unlikeRecipe,
  addComment,
  deleteCommentById,
  updateCommentById,
  addRecipe,
  updateRecipe,
  getRecipeByRecipeId,
  getAllRecipesByEmail,
  deleteRecipeById,

  // getImageBlobById,
} = require("../controllers/RecipeController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route("/add").get(getAllRecipes).post(createRecipe);
router.route("/like/:id/:userId").put(likeRecipe);
router.route("/unlike/:id/:userId").put(unlikeRecipe);
router.route("/comment/add/:recipeId").post(addComment);
router.route("/comment/:recipeId/:commentId").delete(deleteCommentById);
router.route("/comment/:recipeId/:commentId").put(updateCommentById);
router.route("/recipes").post(addRecipe);
router.route("/details/getRecipe/:recipeId").get(getRecipeByRecipeId);
router.route("/:id/:userId").get(getRecipeById);
router.route("/").get(getAllRecipes);
router.route("/getUserRecipes").get(getAllRecipesByEmail);
router.route("/updateRecipe/:recipeId").put(updateRecipe);

//delete recipe by id
router.route("/deleteRecipe/:recipeId").delete(deleteRecipeById);

module.exports = router;
