const jwt = require("jsonwebtoken");
const Intern = require('../models/intern');
const Employer = require('../models/employer');
const Admin = require('../models/admins');


exports.internAuth = async(req, res, next) => {
    try{
        
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "somesecretkey");
        
        req.internData = await (await Intern.findById(decoded._id)).select('-password')
        console.log(req.internData);
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

exports.employerAuth = async(req, res, next) => {
    try{
        
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "somesecretkey");
        
        req.employerData = await Employer.find({email: decoded.email}).select('-password')
        // req.adminData = await Admin.find({email: decoded.email}).select('-password');
        // console.log(req.employerData);
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

exports.adminAuth = async(req, res, next) => {
    try{
        
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "somesecretkey");
        
        req.adminData = await Admin.find({email: decoded.email}).select('-password')
        // console.log(req.employerData);
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

exports.employerAccess = function(...allowedRoles) {
    return (req, res, next) => {
        // console.log(req.adminData[0].role);
      if (!allowedRoles.includes(req.employerData[0].role)) {
        return next(
          new Error('You do not have permission to perform this action')
        );
      }
      next();
    };
};

exports.adminAccess = function(...allowedRoles) {
    return(req, res, next) => {
        if(!allowedRoles.includes(req.adminData[0].role)){
            return next(
                new Error('You do not have permission to perform this action')
            )
        }
        next();
    }
}