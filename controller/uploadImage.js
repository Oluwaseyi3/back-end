const { json } = require("express");
const ImageSchema = require("../models/fileUpload")

module.exports.UploadImage = async (req, res) => {
    const imageUploaded = new ImageSchema({
        image: req.file.path,
        
    })
    console.log(req.file);
    try{
        await imageUploaded.save();
    } catch (error){
        return res.status(400).json({
            message: `Image upload failed, check to see ${error}`,
            status: "error"
        })
        
    }
}