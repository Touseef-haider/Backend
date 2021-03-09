const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const route = require('./Route/route');
const adminRoute = require('./Route/adminroute');
const Proute = require('./Route/postRoute')
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const teacherRoute = require('./Route/teacherRoute');
mongoose.connect('mongodb://localhost/postDb',{ useNewUrlParser: true });
mongoose.connection.once('connected',()=>{
    console.log("connected to database successfuly")
})
mongoose.connection.on('Error',()=>{
    console.log("Error in connecting")
})
const upload = multer();
const app = express();


app.use(cors())
app.use(bodyParser.json());
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.post('/uploads',upload.single('fileToUpload'),(req,res)=>{
    console.log(req.file)
})
app.use('/api',route)
app.use('/api/admin',adminRoute)
app.use('/api/post',Proute)
app.use('/api/teacher',teacherRoute)
const port = process.env.PORT || 5000
app.listen(port,()=>{  
    console.log(`App is running at port ${port}`)
})
