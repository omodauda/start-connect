const Intern = require('../models/intern');
const Employer = require('../models/employer');
const Job = require('../models/jobs');


exports.getAll = async (req, res) => {
    try{
        const interns = await Intern.find().select('-password -createdAt -updatedAt -__v')
        const employers = await Employer.find().select('-password -createdAt -updatedAt -__v')
        const jobs = await Job.find().select('-password -createdAt -updatedAt -__v')
        const doc = [{interns, employers, jobs}]
        return res
        .status(200)
        .json({
        status: "success",
        data: doc
    })
    }
    catch(err){
        res.send(err)
    }
    
}


