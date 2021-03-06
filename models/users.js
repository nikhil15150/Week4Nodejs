var mongoose=require('mongoose');
const Schema=mongoose.Schema;
passportlocalmongoose=require('passport-local-mongoose');

var userSchema= new Schema({
    firstname:{
        type:String,
        default:"",
    },
    lastname:{
        type:String,
        default:""
    },
    admin:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
);
userSchema.plugin(passportlocalmongoose);
var users=mongoose.model('User',userSchema);
module.exports=users;
