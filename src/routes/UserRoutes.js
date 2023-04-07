/* Author : Faiza Umatiya, Saifali Prasla */
const express = require("express");
const multer = require("multer");
const {
  addUser,
  authenticateUser,
  verifyEmail,
  getQuestion,
  updateUser,
  getUserByEmail,
  verifyAnswer,
  updatePassword,
  deleteUser,
} = require("../controllers/UserController");
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

router.route("/addUser").post(addUser);
router.route("/authenticateUser").post(authenticateUser);
router.route("/verifyEmail").post(verifyEmail);
// router.route("/getQuestion").get(getQuestion);
router.route("/getUser/:email").get(getUserByEmail);
// router.route("/updateUser/:email").put(upload.single('photo'), updateUser);
router.route("/updateUser/:email").put(updateUser);
router.route("/updatePassword").put(updatePassword);
router.route("/verifyAnswer").post(verifyAnswer);

//delete user profile
router.route("/deleteUser/:email").delete(deleteUser);

module.exports = router;
