import { Mongoose , Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import {jwt} from "jsonwebtoken";
import {bcrypt} from "bcryptjs";

const videoSchema = new Schema({
    videoFile:{
        type:String, // cloudnary url( like aws s3)
        required:true
    },
    thumbnail:{
        type:String, // cloudnary url( like aws s3)
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    timeDuration:{
        type:Number, // cloudnary url( like aws s3)
        required:true,
        default:0
    },
    views:{
        type:Number,
        default:0       
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true}) // createdAt, updatedAt  ;



export const Video = Mongoose.model("Video", videoSchema); //refer userschema