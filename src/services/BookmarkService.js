/* Author : Parul Raich */
const Bookmark = require("../models/Bookmark");

exports.isBookmarked = async (recipeId, userId) => {
  // console.log("inside bookmark service isbookmarked");
  const data = await Bookmark.where("recipeId")
    .equals(recipeId)
    .where("userId")
    .equals(userId);
  // console.log(data.length);
  if (data.length > 0) return true;

  return false;
};

exports.bookmarkRecipe = async (recipeId, userId) => {
  // console.log("inside bookmark recipe service");
  const bookmarkObject = {
    userId: userId,
    recipeId: recipeId,
  };

  return await Bookmark.create(bookmarkObject);
};

exports.unBookmarkRecipe = async (recipeId, userId) => {
  const bookmarkObject = {
    userId: userId,
    recipeId: recipeId,
  };

  return await Bookmark.findOneAndDelete(bookmarkObject);
};

exports.getAllRecipesByEmail = async (emailId) => {
  console.log("console email ID");
  console.log(emailId);
  return await Bookmark.find({ userId: emailId });
};
