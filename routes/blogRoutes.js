const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const blogCreateSchema = require("../schema/Blog/blogCreateSchema");
const authMiddleWare = require("../middlewares/auth");
const adminMiddleWare = require("../middlewares/admin");
const {
  createBlog,
  getAllBlogs,
  getPublicBlogs,
  getPublicBlogDetails,
  getMyBlogs,
  deleteABlog,
  togglePublic,
  editBlog,
} = require("../controllers/blogController");
const validateReq = require("../middlewares/validateReq");
const blogEditSchema = require("../schema/Blog/blogEditSchema");
const router = express.Router();

//Get All Blogs - admin
router.get("/", authMiddleWare, adminMiddleWare, getAllBlogs);

//Get Public BLogs
router.get("/public", getPublicBlogs);

//Get My Blogs
router.get("/mine", authMiddleWare, getMyBlogs);

//Get Single Blogs

//Get Single Blog - public
router.get("/public/:id", getPublicBlogDetails);

//Create a blog - logged in user
router.post(
  "/",
  authMiddleWare,
  fileUpload.single("image"),
  blogCreateSchema,
  validateReq,
  createBlog
);

//Edit a blog - logged in user
router.put(
  "/:id",
  authMiddleWare,
  fileUpload.single("image"),
  blogEditSchema,
  validateReq,
  editBlog
);

//Delete a blog
router.delete("/:id", authMiddleWare, deleteABlog);

//Toggle Public - logged in user
router.put("/public/:id", authMiddleWare, togglePublic);

//Share a blog

module.exports = router;
