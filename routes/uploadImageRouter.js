

const ImageUploadRouter = require("express").Router();
const {UploadImage} =require("../controller/uploadImage")

const parser = require("../middleWare/cloudinary.config")

ImageUploadRouter.post("/image", parser.single("image"), UploadImage)

module.exports = ImageUploadRouter