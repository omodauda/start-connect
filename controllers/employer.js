const Employer = require('../models/employer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.employerSignup = (req, res, next) => {
    const employerName = req.body.employerName;
    const email = req.body.email;
    const password = req.body.password;

    if (!employerName || !email || !password){
        res.status(400).send({
            status: "false",
            message: "All fields are required"
        });
    } 
    
    Employer.findOne({email})
    .then(employer =>{
        if (employer){
            return res
            .status(423)
            .send({status: "false", message: `employer with email ${email} already exists!`});
        }
    });

    bcrypt
    .hash(password, 12)
    .then(password => {
        let employer = new Employer ({
            employerName,
            email,
            password
        });
        return employer.save();
    })
    .then(() => {
        return res
       .status(200)
       .send({
           status: true,
           message: "Employer registered successfully!"
       })
   })
   .catch(err =>{
       res.send(err);
   })
}

exports.employerLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Employer.findOne({email})
    .then(employer =>{
        if (!employer){
            return res
            .status(404)
            .send("Employer not found, please provide valid details");
        }
        bcrypt.compare(password, employer.password).then(valid => {
            if (!valid) {
                return res
                .status(403)
                .send("Incorrect password");
            }
            const token = jwt.sign(
                {email: employer.email},
                "somesecretkey",
                { expiresIn: "4hr"}
            );
            res.status(200).json({     //.header("x-auth-token", token)
                status: "success",
                data: {
                    message: "Login successful",
                    email: employer.email,
                    token
                }
                
            });
        })
    })
    .catch(err => {
        res.send(err);
    })
}

exports.getEmployers = async (req, res, next) => {
    const employers = await Employer.find();
    return res.status(200).send({
        status: "success",
        result: employers.length,
        data: {
            employers
        }
    });
}

exports.deleteEmployer = async (req, res, next) => {
    const email = req.body.email;
    const employer = await Employer.findOneAndDelete({email:email});
    res.json({
        status: "success",
        message: `"employer with email ${email} deleted successfully"`
    })
}