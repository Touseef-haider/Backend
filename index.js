const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const path = require('path')
const multer = require('multer');
const methodOverride = require('method-override')
const route = require('./Route/route');
const adminRoute = require('./Route/adminroute');
const Proute = require('./Route/postRoute')
const userTypeRoutes = require('./SMS_Routes/userTypes')
const audience = require('./SMS_Routes/audience')
const logInRoute = require('./SMS_Routes/loginRoute');
const studentRoute = require('./SMS_Routes/students');
const teacherRoute = require('./SMS_Routes/teacher');
const classesRoute = require('./SMS_Routes/classes');
const feeRoute = require('./SMS_Routes/fee');
const feeTypeRoute = require('./SMS_Routes/feeTypes');
const salaryTypeRoute = require('./SMS_Routes/salaryTypes');
const SalaryRoute = require('./SMS_Routes/salary');
const homWorkRoute = require('./SMS_Routes/hw');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

// const teacherRoute = require('./Route/teacherRoute');
const PurchaseRoute = require('./Route/purchaseRoute');
const productRoute = require('./Route/productRoute');
const fs = require('fs');
const File = require('./SMS/image.model');
const Audience = require('./SMS/audience.model');
const app = express();

mongoose.connect('mongodb://localhost:27017/DB')
mongoose.connection.once('connected',()=>{
    console.log("Connected to the database")
})
mongoose.connection.on('error',()=>{
    console.log("Error in connecting a database")
})

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + "-"+ file.originalname)
    }
})




const upload = multer({ storage:storage });
app.use(cors())
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/uploads',express.static('./uploads'))
app.use(passport.initialize());
require('./middleware/passport')(passport);

// for storing file i.e. image
app.post('/uploads/:idOfUser',upload.single('fileToUpload'),async (req,res)=>{  

    let user  = await Audience.findById({_id:req.params.idOfUser}).catch(err=>res.json(err))

    let newFile = new File({
        file:fs.readFileSync(req.file.path)
    })
    newFile.user = user;
    await newFile.save();
    res.json("image uploaded to the database")
})


app.get('/uploads/:id',async (req,res)=>{
    let u  = await Audience.findById({_id:req.params.id}).catch(err=>res.json(err))
    let image = await File.find({ user : u._id}).populate('user').catch(err=>res.json(err))
    res.json(image)
})
app.delete('/uploads/:fId',async (req,res)=>{
    let image = await File.deleteOne({ _id : req.params.fId}).catch(err=>res.json(err))
    res.json("deleted")
})

app.use('/api',route)
app.use('/api/admin',adminRoute)
app.use('/api/post',Proute)
app.use('/api/teacher',teacherRoute)
app.use('/purchase',PurchaseRoute);
app.use('/product',productRoute);

// new routes are starting from here 
app.use('/userTypes',userTypeRoutes);
app.use('/audience',audience);
app.use('/login',logInRoute);
app.use('/student',studentRoute);
app.use('/teacher',teacherRoute);
app.use('/classes',classesRoute);
app.use('/fee',feeRoute);
app.use('/feeTypes',feeTypeRoute);
app.use('/salaryType',salaryTypeRoute);
app.use('/salary',SalaryRoute)
app.use('/hw',homWorkRoute)

const port = process.env.PORT || 5000
app.listen(port,()=>{  
    console.log(`App is running at port ${port}`)
})
