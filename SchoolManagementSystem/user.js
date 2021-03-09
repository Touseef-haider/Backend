const mongoose= require('mongoose');

const UsersSchema = mongoose.Schema({
    Name:String,
    Email:String,
    UserName:String,
    role:{
        type:String,
        default:"user",
        enum:['admin','student','teacher']
    },
    Password:String,
})


const User = mongoose.model('User',UsersSchema);

module.exports = User;