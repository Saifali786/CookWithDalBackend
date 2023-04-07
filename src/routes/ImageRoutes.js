/* Author : Parul Raich */
const express = require("express");

const { getImageBlobById, getPhotoBlobById } = require("../controllers/ImageController");

const router = express.Router();

router.route("/:image").get(getImageBlobById);
// router.route("/profile/:photo").get(getPhotoBlobById);
module.exports = router;
