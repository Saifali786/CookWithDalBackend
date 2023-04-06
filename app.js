const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const shoppingListRouter = require("./src/routes/ShoppingListRoutes");
const recipeRouter = require("./src/routes/RecipeRoutes");
const recipeLikedByUserRouter = require("./src/routes/RecipeLikedByUserRoutes");
const userRouter = require("./src/routes/UserRoutes");
const ImageRoutes = require("./src/routes/ImageRoutes");
const bookmarkRouter = require("./src/routes/BookmarkRoutes");

require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "./uploads")));
app.use(express.static(path.join(__dirname, "./useruploads")));

const whitelistOrigins = [
  "https://web-cs-dal-ca-cwd-group04-csci5709-a3.netlify.app/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelistOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/shopping-list", shoppingListRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/recipeLikedByUser", recipeLikedByUserRouter);
app.use("/api/add-recipe", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/bookmarkRecipe", bookmarkRouter);
app.use("/api/images", ImageRoutes);

//configure mongoose
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.y7706nu.mongodb.net/cook-with-dal?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 8080`);
});
app.disable("x-powered-by");
module.exports = app;
