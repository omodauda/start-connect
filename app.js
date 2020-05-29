const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const  internRoutes = require('./routes/intern');
const employerRoutes = require('./routes/employer');
const jobRoutes = require('./routes/jobs');
const marketRoutes = require('./routes/marketplace');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/api/v1', (req, res) =>{
    res.send("Welcome to Start-connect");
});

app.use('/api/v1/intern', internRoutes);
app.use('/api/v1/employer', employerRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/marketplace', marketRoutes);
app.use('/api/v1/admin', adminRoutes);

mongoose
    .connect("mongodb+srv://admin-babslaw:babalola1996@cluster0-hthp7.mongodb.net/startconnectDB",
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then (result =>{
        console.log("Mongo Atlas connected!");
    })
    .catch(err => {
        console.log(err);
    });


let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}

app.listen(port, function(){
    console.log("server running on port 3000!");
});