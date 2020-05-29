const Job = require('../models/jobs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.postJob = async (req, res, next) => {
    const {
      job_title,
      job_description,
      job_location,
      role_focus,
      position_type,
      skill_set,
    } = req.body;
    if (
      !(
        job_title ||
        job_description ||
        role_focus ||
        position_type ||
        skill_set ||
        job_location
      )
    ) {
      return res.status(400).send({
        status: 'false',
        message: 'All necessary fields are required',
      });
    }
    const job = await Job.findOne({ job_title });
    if (job) {
      return res.status(423).json({
        status: 'false',
        message: `A job with title ${job_title} already exists!`,
      });
    }
    const doc = await Job.create(req.body);
    res.status(200).json({
      status: true,
      message: 'job successfully posted!',
      data: {
        doc
      },
    });
  };

