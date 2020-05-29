const Intern = require('../models/intern');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.internSignUp = (req, res, next) => {
    const internID = req.body.internID;
    const email = req.body.email;
    const password = req.body.password;

    if (!internID || !email || !password) {
        res.status(400).json({
            status: false,
            message: "All fields are required"
        });
    }

    Intern.findOne({email})
    .then(intern => {
        if (intern){
            return res
            .status(423)
            .send({status: false, message: `email ${email} already exists`});
        }
    });

    bcrypt
    .hash(password, 12)
    .then(password => {
        let intern = new Intern ({
            internID,
            email,
            password
        });
        return intern.save();
    })
    .then(() => {
         return res
        .status(200)
        .json({
            status: true,
            message: "Intern registered successfully!"
        })
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.internlogin = (req, res, next) => {
    const internID = req.body.internID;
    const email = req.body.email;
    const password = req.body.password;
    Intern.findOne({internID, email})
    .then(intern =>{
        if (!intern){
            return res
            .status(404)
            .send("User not found, please provide valid details");
        }
        bcrypt.compare(password, intern.password).then(valid => {
            if (!valid) {
                return res
                .status(403)
                .send("Incorrect password");
            }
            const token = jwt.sign(
                {email: intern.email, id: intern.internID},
                "somesecretkey",
                { expiresIn: "4hr"}
            );
            res.status(200).json({     //.header("x-auth-token", token)
                status: "success",
                data: {
                    message: "Login successful",
                    email: intern.email,
                    token
                }
                
            });
        })
    })
    .catch(err => {
        res.send(err);
    })
}


exports.internUpdate = async (req, res) =>{
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const skill_sets = req.body.skillsets
    try{
        const condition = {email: email}
        const update = {$set: {firstName: firstName, lastName:lastName, skill_sets: skill_sets}};
        const option = {new:true}
        const intern = await Intern.findOneAndUpdate( condition, update, option);
        return res.status(200).json({
            status: 'success',
            message: 'intern updated successfully',
            data: {
                data: intern
            }
        })
    }
    catch(err){
        res.json(err);
    }
}

exports.deleteIntern = async (req, res, next) => {
    try{
        const email = req.body.email;
        const intern = await Intern.findOneAndDelete({email: email});
        res.json({
            status: "success",
            message: "intern deleted successfully"
        });
    }
    catch(err){
        res.send(err);
    }
   
}


