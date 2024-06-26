import * as mongoose from "mongoose"

export const UserSchema=new mongoose.Schema({
    name:String ,
    email:{type:String,unique:true} ,
    password:String 
    
})


export interface User extends mongoose.Document{
    id:string,
    name:string,
    email:string,
    password:string,

}