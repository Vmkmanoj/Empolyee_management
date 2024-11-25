

const MongoDB =  require("mongoose")

const User= new MongoDB.Schema({

    name:{
        type:'String',
    },
    password:{
        type:'String'
    }
})

const UserAdmin = MongoDB.model('User',User);

module.exports = UserAdmin;