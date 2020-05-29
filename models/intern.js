const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const internSchema = new Schema({
    internID: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error ({error: "Invalid Email address"});
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        default: "intern"
    },
    skill_sets: {
        type: Array
    },

}, {timestamps: true});


module.exports = mongoose.model("Intern", internSchema);