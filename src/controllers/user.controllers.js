import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/apierror.js";
import { User } from "../models/user.models.js";
import {UploadOnCloudinary} from "../utils/cloudinary_fileUpload.js";
import { APIresponse } from "../utils/APIresponse.js";

const RegisterUser = asyncHandler(
    async (req,res)=>{
        /* 
            1) get user details from front end / postman 
            2) validation ( check for correct format and requirements)
            3) check if user already exists (email or username)
            4) check for images (not imp), check for avatar (compulsory)
            5) upload them to cloudinary, avatar check
            6) create user object , creation call / entry in db
            7) remove passwords and refresh token fields
            8) check for user creation 
            9) return response 
        */
        const {fullname,email,username,password} = req.body
        console.log("email: ",email)

        if(
            [fullname,email,username,password].some((field)=>field?.trim() === "")
        )
        {
            throw new APIerror(
                400,
                "fullname is required"
            )
        }

        const existingUser = User.findOne({
                                $or : [{username},{email}]
                            })
        
        if(existingUser){
            throw APIerror(
                409,
                "username or email already exists"
            )
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0];

        if(!avatarLocalPath){
            throw new APIerror(
                400,
                "avatar not uploaded"
            )
        }
        

        const avatar = await UploadOnCloudinary(avatarLocalPath) /* written in different file */
        const coverImage = await UploadOnCloudinary(coverImageLocalPath) /* written in different file */

        if (!avatar) {
            throw new APIerror(
                400,
                "avatar not found"
            )
        }

        const user = await User.create({
            fullname,
            avatar : avatar.url,
            coverImage : coverImage?.url || "",
            email : email.toLowerCase(),
            password : password,
            username : username
        })
        
        const createdUser = await user.findById(user._id).select(
            "-password -refreshToken",

        )
        
        if(!createdUser){
            throw new APIerror(
                500,
                "something went wrong while registering user"
            )
        }

        return res.status(201).json(
            new APIresponse(
                200,
                createdUser,
                "user registered successfully :)",
                
            )
        )
    }
)

export {RegisterUser};