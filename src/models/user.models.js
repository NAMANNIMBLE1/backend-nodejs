import { Mongoose , Schema } from "mongoose";
import {jwt} from "jsonwebtoken";
import {bcrypt} from "bcryptjs";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const userSchema = new Schema({
    username :{
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        unique : true,
        index : true // computationally expensive but faster for searching
    },
    email :{
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        unique : true,
    },
    fullname :{
        type : String,
        trim : true,
        required : true,
        index: true
    },
    password :{
        type : String,
        required : [true, "Password is required"],
        minLength : [6, "Password must be at least 6 characters long"],
        maxLength : [64, "Password must be at most 64 characters long"]
    },
    avatar :{
        type : String, // cloudnary url( like aws s3)
        default : null
    },
    coverImage :{
        type : String,
        default : null,
        required : false
    },
    watchHistory :[{
        type : Schema.Types.ObjectId, //array of object ids
        ref : "Video", // refer to video model
        default : []
    }],


}, { timestamps : true}) // createdAt, updatedAt


// encrypt password before saving user
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8);
        next();
    }
    next(); 
}) 

// check if password matches(custom middleware)
userSchema.methods.isPasswordMatch = async function(password){
    return await bcrypt.compare(password, this.password);
}


// generate jwt tokens (access and refresh)
userSchema.methods.generateAccessToken = async function(){
    const user = this;
    const accessToken = await jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET , // secret key
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}, // options (expiry time)
    );
    return accessToken;
}

// generate refresh token
userSchema.methods.generateRefreshToken = async function(){
    const user = this;
    const refreshToken = await jwt.sign(
        {
            _id : this._id,
            // email : this.email,
            // username : this.username,
            // fullname : this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    );
    return refreshToken;
}


export const User = Mongoose.model("User", userSchema); //refer userschema