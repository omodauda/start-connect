const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    job_title: {
        type: String,
        required: true
    },
    job_description: {
        type: String,
        required: true
    },
    role_focus: {
        type: String,
        default: "",
        enum : ["Frontend", "Backend", "Full-stack"],
        required: true
    },
    position_type: {
        type: String,
        default: "",
        enum: ["Full-time", "Remote", "Contract"],
        required: true
    },
    skill_set: {
        type: Array,
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    job_status: {
        type: String,
        default: "open",
        enum: ["open", "closed"]
    },
    company_name: {
        type: String
    },
    company_website: {
        type: String
    },
    company_description: {
        type: String
    },

}, {timestamps: true});

module.exports = mongoose.model("Job", jobSchema);