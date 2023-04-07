/* Author : Parul Raich */

const path = require("path");

exports.getImageBlobById = async (req, res) => {
  const imagePath = req.params.image;
  const file = path.join(__dirname, "..", "..", "uploads", imagePath);
  res.sendFile(file);
  // res.sendFile(imagePath);
};

// exports.getPhotoBlobById = async (req, res) => {
//   const photoPath = req.params.photo;
//   const file = path.join(__dirname, "..", "..", "useruploads", photoPath);
//   res.sendFile(file);
//   // res.sendFile(imagePath);
// };
