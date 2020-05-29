const Admin = require('../models/admins');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminSignUp = (req, res, next) => {
   
    const {
        email,
        password,
        role
    } = req.body;

    if (!email || !password) {
        res.status(400).send({
            status: false,
            message: "All fields are required"
        });
    }

    Admin.findOne({email})
    .then(admin => {
        if (admin){
            return res
            .status(423)
            .send({status: false, message: `email ${email} already exists`});
        }
    });

    if (role === "superAdmin"){
        res.status(423).send({
            status: false,
            message: "You can't signup as an admin"
        })
        return;
    }

    bcrypt
    .hash(password, 12)
    .then(password => {
        let admin = new Admin ({
            email,
            password,
            role
        });
        return admin.save();
    })
    .then(() => {
         return res
        .status(200)
        .json({
            status: true,
            message: "Admin registered successfully!"
        })
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.adminlogin = (req, res, next) => {
    
    const {email, password} = req.body;
    Admin.findOne({email})
    .then(admin =>{
        if (!admin){
            return res
            .status(404)
            .send("Admin not found, please provide valid details");
        }
        bcrypt.compare(password, admin.password).then(valid => {
            if (!valid) {
                return res
                .status(403)
                .send("Incorrect password");
            }
            const token = jwt.sign(
                {_id: admin.id, email: admin.email},
                "somesecretkey",
                { expiresIn: "4hr"}
            );
            res.status(200).send({     //.header("x-auth-token", token)
                status: "success",
                data: {
                    message: "Login successful",
                    email: admin.email,
                    token
                }
                
            });
        })
    })
    .catch(err => {
        res.send(err);
    })
}