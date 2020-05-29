const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin", "superAdmin"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Admin", adminSchema);