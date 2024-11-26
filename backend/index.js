const express = require("express")
const Mongoess = require("mongoose")

const cors = require("cors")

const bodypares = require("body-parser")
const Post = 3000

const User = require("./Modals/User")

const app = express();

app.use(cors());

app.use(bodypares.json())

const Empolyee = require("./Modals/EmpolyeInfo")

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

const SECRET_KEY = "your_secret_key";

app.post("/Username", async (req, res) => {
    const { UserName, PassWord } = req.body;

    try {
        const user = await User.findOne({ name: UserName });

        if (!user || user.password !== PassWord) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({
            message: "Login successful!",
            token,
        });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});

// Middleware to Verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user; // Attach decoded payload to the request
        next();
    });
};

// Example of a Protected Route
app.get("/protected-route", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});


app.post('/Information', async (req, res) => {
    const { name, email, phone, designation, gender, course } = req.body;

    // Validate input
    if (!name || !email || !phone || !designation || !gender || !course) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Create employee
        const employee = await Empolyee.create({
            name,
            email,
            phone,
            designation,
            gender,
            course,
        });

        // Send success response
        res.status(201).json({
            message: 'Employee information saved successfully!',
            employee,
        });
    } catch (error) {
        console.error(error);

        // Handle errors (e.g., duplicate email)
        res.status(500).json({ error: 'Failed to save employee information.' });
    }
});


app.get('/Empolye_detials', async (req, res) => {
    try {
        const Empolye_info = await Empolyee.find();
        const count = await Empolyee.countDocuments();

        // Send both data and count in a single response
        res.status(200).json({ Empolye_info, count });

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch employees' }); 
    }
});



app.delete('/Empolye_detials/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Attempting to delete employee with ID:', id);  // Log entry

    try {
        const del = await Empolyee.findByIdAndDelete(id);

        if (!del) {
            console.log('Employee not found');
            return res.status(404).json({ message: 'Employee not found' });
        }

        console.log('Employee deleted successfully');
        return res.status(200).json({ message: 'Employee deleted successfully' });

    } catch (error) {
        console.error('Error deleting employee:', error.message);
        return res.status(500).json({ message: 'Error deleting employee' });
    }
});


app.post("/Empolye_detials/:id", async (req, res) => {
    const { id } = req.params; // Extract the ID from the route parameter
    const { name, email, phone, designation, gender, course } = req.body; // Extract fields to update

    try {
        // Check if the employee exists
        const existingEmployee = await Empolyee.findById(id);
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Update the employee's details
        const updatedEmployee = await Empolyee.findByIdAndUpdate(
            id,
            { name, email, phone, designation, gender, course }, // Fields to update
            { new: true } // Return the updated document
        );

        res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee,
        });
    } catch (error) {
        console.error("Error updating employee:", error.message);
        res.status(500).json({ message: "An error occurred while updating the employee" });
    }
});



app.listen(Post,(req,res)=>{

    console.log(`server runing on this ${Post}`)

})