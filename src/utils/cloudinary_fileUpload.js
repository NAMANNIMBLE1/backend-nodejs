import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config(); // Load environment variables from .env file
import fs from 'fs'

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    secure : true
})

const UploadOnCloudinary = async(LocalFilePath)=>{
    try{
        if(!LocalFilePath){
            // upload default image
            const response = cloudinary.uploader.upload(LocalFilePath,{resource_typeL:'auto'})
            .then((result)=>{
                return {
                    url : result.url,
                    message : "file uploaded successfully"
                }
            })
            .catch((error)=>{
                return {
                    url : "",
                    message : error.message
                }
            })
            // file uploaded successfully

        }
    }
    catch(error){
        fs.unlinkSync(LocalFilePath) // remove file from local uploads folder when failed to upload on cloudinary
        return {
            url : "",
            message : error.message
        }
    }
}

export default UploadOnCloudinary;