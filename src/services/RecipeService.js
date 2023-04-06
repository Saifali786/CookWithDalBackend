/* Author: Anuj Dawar, Sagar */

const Recipe = require("../models/Recipe");
const Bookmark = require("../models/Bookmark");
const RecipeLikedByUserModel = require("../models/RecipesLikedByUsers");
const { v4: uuidv4 } = require("uuid");

class RecipeService {
  constructor() {}

  async createRecipe(recipeData, imagePath) {
    const recipe_id = uuidv4().slice(0, 5);

    const {
      name,
      emailId,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
    } = recipeData;

    const newRecipe = new Recipe({
      name,
      recipe_id,
      emailId,
      image: imagePath,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
      createdAt: new Date(),
    });
    const savedRecipe = await newRecipe.save();
    return savedRecipe;
  }

  async getRecipeById(recipeId) {
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  }

  async getAllRecipes() {
    const recipes = await Recipe.find();
    return recipes;
  }

  async getAllRecipesByEmail(emailId) {
    return await Recipe.find({ emailId: emailId });
  }

  async getRecipeById(recipeId) {
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  }

  async getAllRecipes() {
    const recipes = await Recipe.find();
    return recipes;
  }

  async getAllRecipesByEmail(emailId) {
    return await Recipe.find({ emailId: emailId });
  }

  async updateRecipe(recipeId, recipeData) {
    const {
      name,
      recipe_id,
      emailId,
      image,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
    } = recipeData;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        name,
        recipe_id,
        image,
        emailId,
        description,
        ingredients,
        instructions,
        servings,
        prepTime,
        updatedAt: new Date(),
      },
      { new: true }
    );
    return updatedRecipe;
  }

  deletedRecipe = async (recipeId) => {
    console.log("inside delete recipe service");
    console.log("RECEIPEID----------------->>", recipeId);
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    return deletedRecipe;
  };

  getRecipeById = async (id, userId) => {
    const recipe = await Recipe.findById(id);

    const likedRecipe = await RecipeLikedByUserModel.where("recipeId")
      .equals(id)
      .where("userId")
      .equals(userId);

    if (likedRecipe.length > 0) {
      const tempObject = recipe.toJSON();
      tempObject["liked"] = true;
      return tempObject;
    } else {
      const tempObject = recipe.toJSON();
      tempObject["liked"] = false;
      return tempObject;
    }
  };

  likeRecipe = async (recipeId, recipe, userId) => {
    const recipeObject = await Recipe.findByIdAndUpdate(recipeId, recipe);

    const recipeLikedByUserObject = {
      recipeId: recipeId,
      userId: userId,
    };

    await RecipeLikedByUserModel.create(recipeLikedByUserObject);

    return recipeObject;
  };

  unlikeRecipe = async (recipeId, recipe, userId) => {
    const recipeObject = await Recipe.findByIdAndUpdate(recipeId, recipe);

    const recipeUnlikedByUserObject = {
      recipeId: recipeId,
      userId: userId,
    };

    await RecipeLikedByUserModel.findOneAndDelete(recipeUnlikedByUserObject);

    return recipeObject;
  };

  addComment = async (recipeId, comment) => {
    const recipe = await Recipe.findById(recipeId);
    recipe.comments.push(comment);
    recipe.save();
    return recipe;
  };

  deleteComment = async (recipeId, commentId) => {
    const recipe = await Recipe.findById(recipeId);

    const filtered = recipe.comments.filter((c) => {
      return c.id != commentId;
    });

    recipe.comments = filtered;
    recipe.save();

    return recipe;
  };

  updateComment = async (recipeId, commentId, comment) => {
    let recipe = await Recipe.findById(recipeId);

    let updatedComments = recipe.comments.forEach((c) => {
      if (c.id == commentId) c.comment = comment.comment;
    });

    console.log("recipe", recipe);
    console.log("updatedComments", updatedComments);

    recipe.save();

    return recipe;
  };
}

module.exports = RecipeService;

// const Recipe = require('../models/Recipe');
// // const shortid = require('shortid');
// const { v4: uuidv4 } = require('uuid');

// class RecipeService {
//   constructor() {}

//   async createRecipe(recipeData) {
//     // const recipe_id = shortid.generate();
//     const recipe_id = uuidv4().slice(0,5);

//     const { name, image, description, ingredients, instructions, servings, prepTime } = recipeData;
//     const newRecipe = new Recipe({
//       name,
//       recipe_id,
//       emailId:"saif@gmail.com",
//       image,
//       description,
//       ingredients,
//       instructions,
//       servings,
//       prepTime,
//       createdAt: new Date()
//     });
//     const savedRecipe = await newRecipe.save();
//     return savedRecipe;
//   }

//   async getRecipeById(recipeId) {
//     console.log(recipeId);
//     const recipe = await Recipe.findById(recipeId);
//     console.log(recipe);
//     return recipe;
//   }

//   async getAllRecipes() {
//     const recipes = await Recipe.find();
//     return recipes;
//   }

//   async updateRecipe(recipeId, recipeData) {
//     const { name, recipe_id, emailId, image, description, ingredients, instructions, servings, prepTime } = recipeData;
//     const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
//       name,
//       image,
//       recipe_id,
//       emailId,
//       description,
//       ingredients,
//       instructions,
//       servings,
//       prepTime,
//       updatedAt: new Date()
//     }, { new: true });
//     return updatedRecipe;
//   }

//   async deleteRecipe(recipeId) {
//     const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
//     return deletedRecipe;
//   }
// }

// module.exports = RecipeService;
