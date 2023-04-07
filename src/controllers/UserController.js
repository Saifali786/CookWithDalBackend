/* Author : Faiza Umatiya, Saifali Prasla */
const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.addUser = async (req, res) => {
  try {
    console.log("req.body");
    console.log(req.body);
    const { email, password, answer } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedAnswer = bcrypt.hashSync(answer, saltRounds);
    const emailExistsResult = await checkIfEmailExists(email);
    if (emailExistsResult.status === 409) {
      return res.status(409).json({ message: emailExistsResult.message });
    }

    const newUser = await UserService.createUser({
      ...req.body,
      password: hashedPassword,
      answer: hashedAnswer,
      photo: "",
      bio: "",
    });

    res.json({
      createdUser: newUser.transform(),
      status: "success",
      statusMessage: "Successfully registered",
    });
  } catch (err) {
    console.log("error");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const emailExistsResult = await checkIfEmailExists(email);
    console.log(emailExistsResult.hashedPassword);
    if (emailExistsResult.status === 409) {
      const isMatch = bcrypt.compareSync(
        password,
        emailExistsResult.hashedPassword
      );
      if (isMatch) {
        res.status(200).json({ message: "User Authenticated" });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "Please register" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const emailExistsResult = await checkIfEmailExists(email);
    if (emailExistsResult.status === 409) {
      res.status(200).json({
        message: "Success",
        question: emailExistsResult.question,
        answer: emailExistsResult.answer,
      });
    } else {
      res.status(404).json({ message: "Please register" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.verifyAnswer = async (req, res) => {
  try {
    const { email, answer } = req.body;

    const emailExistsResult = await checkIfEmailExists(email);
    console.log(emailExistsResult);
    if (emailExistsResult.status === 409) {
      const isMatch = bcrypt.compareSync(
        answer,
        emailExistsResult.hashedAnswer
      );
      if (isMatch) {
        res.status(200).json({ message: "Answer correct" });
      } else {
        res.status(401).json({ message: "Incorrect answer" });
      }
    } else {
      res.status(404).json({ message: "Please register" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log(email, newPassword);
  const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
  try {
    const result = await UserService.updatePassword(email, hashedPassword);
    console.log(result);
    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function checkIfEmailExists(email) {
  const existingUser = await UserService.findUser({ email });
  if (existingUser) {
    return {
      status: 409,
      message: "Email already exists",
      hashedPassword: existingUser.password,
      question: existingUser.question,
      hashedAnswer: existingUser.answer,
    };
  } else {
    return { status: 200 };
  }
}

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await UserService.findUser({ email });
    // console.log("Printing user")
    // console.log(user)
    console.log("get user by email works");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    res.json({
      user: user.transform(),
      status: "success",
      statusMessage: "User found",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log("printing req body in update profile");
    console.log(req.body);

    console.log(req.params);
    console.log(req.params.email);
    const email = req.params.email;

    console.log(email);
    // let photoPath = req.file?.path;
    const { firstName, lastName, bio, photo } = req.body;
    console.log("firstname");
    console.log(firstName);
    console.log(photo);

    const existingUser = await UserService.findUser({ email });
    console.log("printing existing user");
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("inside else part");
    console.log("existingUser._id");
    console.log(existingUser._id);
    const updatedUser = await UserService.updateUserByEmail(email, {
      // _id: existingUser._id,
      email,
      firstName,
      lastName,
      bio,
      photo,
    });

    res.json({
      updatedUser: updatedUser.transform(),
      status: "success",
      statusMessage: "User details updated",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  console.log("inside delete user");
  try {
    const { email } = req.params;

    const user = await UserService.findUser({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await UserService.deleteUserByEmail({ email });

    res.json({
      message: "User deleted successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
