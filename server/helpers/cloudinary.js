const cloudinary = require('cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const storage = new multer.memoryStorage()

async function imageUploadUtil(file) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: "banners", // This ensures files go into the 'banners' folder
            resource_type: "auto",
        });

        return result;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Image upload failed. Please try again.");
    }
}

const upload = multer({storage})

module.exports = {upload, imageUploadUtil}