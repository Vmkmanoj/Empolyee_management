const express = require("express")
const Mongoess = require("mongoose")

const cors = require("cors")

const bodypares = require("body-parser")
const Post = 3000

const User = require("./Modals/User")

const app = express();

app.use(cors());

app.use(bodypares.json())

Mongoess.connect("mongodb+srv://mano:mano123@employeemanagement.7dtux.mongodb.net/?retryWrites=true&w=majority&appName=employeemanagement")
.then(()=>console.log("mongoDb connected"))
.catch((err)=>console.log(err))


// const user =async () =>{

//     const newUser = new User({
//         name:"User1",
//         password:'Password1'
//     })

//     const saveNewuser = await newUser.save()

//     console.log(saveNewuser)
// }

// user();



app.post('/Username',async (req, res) => {

    const { UserName, PassWord } = req.body;

    console.log(UserName,PassWord)

    const user = await User.findOne({ name: UserName, password: PassWord });

    console.log(user)

    if (user) {
       
        res.json({ message: 'Username and password are correct' });


    } else {
      
        res.status(401).json({ message: 'Invalid username or password' });

    }
});



app.post('/Infomation',async(req,res)=>{

    const {name, email, phone, designation, gender, course, upload} = req.body

    console.log(name)




})



app.listen(Post,(req,res)=>{

    console.log(`server runing on this ${Post}`)

})