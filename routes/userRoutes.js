const express = require("express");

const {
  getAllUsers,
  getSingleUser,
  getMyProfile,
  userSignUp,
  userSignIn,
  userSignOut,
  updateUser,
  deleteUser,
  changePassword,
} = require("../controllers/userControllers");

const fileUpload = require("../middlewares/fileUpload");
const validateReq = require("../middlewares/validateReq");
const signInSchema = require("../schema/User/SignInSchema");
const signUpSchema = require("../schema/User/SignUpSchema");
const authMiddleWare = require("../middlewares/auth");
const adminMiddleWare = require("../middlewares/admin");
const userUpdateSchema = require("../schema/User/UserUpdateSchema");
const changePwSchema = require("../schema/User/ChangePwSchema");

const router = express.Router();

router.get("/", authMiddleWare, adminMiddleWare, getAllUsers);

router.get("/mine", authMiddleWare, getMyProfile);

router.get("/:id", authMiddleWare, adminMiddleWare, getSingleUser);

router.post(
  "/signUp",
  fileUpload.single("avatar"),
  signUpSchema,
  validateReq,
  userSignUp
);

router.post("/signIn", signInSchema, validateReq, userSignIn);

router.post("/signOut", authMiddleWare, userSignOut);

router.put(
  "/change-password",
  changePwSchema,
  validateReq,
  authMiddleWare,
  changePassword
); //prevPw, newPw, confirmPw

router.put(
  "/",
  authMiddleWare,
  fileUpload.single("avatar"),
  userUpdateSchema,
  updateUser
);

router.delete("/", authMiddleWare, deleteUser);

module.exports = router;
