import express from "express";
import {
  getUsers,
  getSingleUser,
  createUser,
  createImage,
  changeAvatar,
  getUsername,
  changeUsername,
  changePassword,
  changeFullname,
  deletePhoto,
  changePrivacy,
  deleteUser,
  getId,
  queryUsername,
  getImages,
  getIsUser
} from "../controllers/Users.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.patch("/image/:id", createImage)
router.patch("/avatar/:id", changeAvatar)
router.get("/username/:username", getUsername);
router.patch("/changeusername/:id", changeUsername);
router.patch("/changepassword/:id", changePassword);
router.patch("/changefullname/:id", changeFullname);
router.patch("/deletephoto/:id", deletePhoto);
router.patch("/privacy/:id", changePrivacy);
router.delete("/deleteprofile/:id", deleteUser);
router.get("/authid/:username", getId);
router.get("/queryusername/:username", queryUsername);
router.get("/queryimages/:id", getImages);
router.get("/isuser/:username", getIsUser);
export default router;