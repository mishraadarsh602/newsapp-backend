
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
   name:{
    type:String
   },
   email:{
    type:String
   },
   phone:{
    type:String
   },
   password:{
    type:String
   },
   tokens:[{
    token:{
        type:String
    }
}]

})

userSchema.methods.generateAuthToken = async function(){
    const token =  await  jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
  // console.log(token);
   this.tokens= this.tokens.concat({token:token})
   await this.save();
   return token;
 }
 
 userSchema.pre("save",async function(next){
 
     if(this.isModified("password")){
         this.password= await bcrypt.hash(this.password,10);
         next();
     }
    
 })
 

const  Users = mongoose.model("user",userSchema);
module.exports = Users;