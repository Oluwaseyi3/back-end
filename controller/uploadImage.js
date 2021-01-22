const ImageSchema = require("../models/userModel.js")

module.exports.UploadImage = async (req, res) => {
    const imageUploaded = new ImageSchema({
        image: req.file.path
    })

    try{
        await imageUploaded.save();
    } catch (error){
        return res.status(400).json({
            message: `Image upload failed, check to see ${error}`,
            status: "error"
        })
        
    }
}