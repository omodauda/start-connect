const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const employerSchema = new Schema ({
    employerName: {
        type: String,
        required: true
    },
    email: {
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
        required: true
    },
    role: {
        type: String,
        default: "employer"
    },

}, {timestamps: true});

module.exports = mongoose.model("Employer", employerSchema);