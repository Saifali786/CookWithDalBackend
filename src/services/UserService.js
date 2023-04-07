const UserModel = require("../models/User");
const RecipeModel = require("../models/Recipe");
const LikesCommentsModel = require("../models/RecipesLikedByUsers");
const BookmarkModel = require("../models/Bookmark");

exports.createUser = async (user) => {
  return await UserModel.create(user);
};
exports.findUser = async (email) => {
  return await UserModel.findOne(email);
};
exports.updatePassword = async (email, password) => {
  return await UserModel.findOneAndUpdate(
    { email: email },
    { $set: { password: password } },
    { returnOriginal: false }
  );
};
exports.updateUserByEmail = async (email, updates) => {
  console.log("update user by email");
  console.log(email);
  // console.log(updates.photo);
  const user = await UserModel.findOneAndUpdate({ email: email }, updates, {
    returnOriginal: false,
  });
  console.log("user in by email service");
  console.log(user);

  return user;
};

exports.deleteUserByEmail = async (email) => {
  email = email.email;

  console.log("Inside delete user service ---", email);

  // const likesComments = await RecipeModel.where("userId").equals(email)
  // console.log("likesCommentsToDelete", likesComments);

  const response = await UserModel.findOneAndDelete({ email: email });
  const response1 = await BookmarkModel.deleteMany({ userId: email });
  console.log("delete many response");
  console.log(response1);
  console.log("---response----");
  console.log(response);
  return response;
};
