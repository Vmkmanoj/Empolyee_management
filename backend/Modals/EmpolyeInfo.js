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
});

const EmployeeInfo = MongoDB.model("Employee", employInfo);

module.exports = EmployeeInfo
