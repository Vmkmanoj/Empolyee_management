const MongoDB = require("mongoose");

const employInfo = new MongoDB.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    designation: {
        type: String,
    },
    gender: {
        type: String,
    },
    course: {
        type: String,
    },
    image: {
        data: Buffer, 
        contentType: String, // MIME type of the image (e.g., 'image/jpeg', 'image/png')
    },
});

const EmployeeInfo = MongoDB.model("Employee", employInfo);

module.exports = EmployeeInfo
