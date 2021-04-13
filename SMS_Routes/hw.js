const express = require('express');
const multer = require('multer');
const fs = require('fs')
const route = express.Router();
const Classes = require('../SMS/class.model');
const Teacher = require('../SMS/teacher.model');
const HomeWork = require('../SMS/hw.model');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'homeWork')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage:storage})

route.post('/:teacherId',upload.single('homeWork'), async(req,res)=>{

   let teacher = await Teacher.findById({_id : req.params.teacherId}).catch(err=>res.json(err)) 

   let classOf = await Classes.find({ classTitle : teacher.classTeacherOf })
   

   let newHomeWork = new HomeWork({
       homeWork: fs.readFileSync(req.file.path)
   })

   newHomeWork.postedBy = teacher;
   newHomeWork.forClass = classOf[0] 

   await newHomeWork.save().then(err=>console.log(err))

   res.json("home work posted")
})

route.get('/',async (req,res)=>{
    let hw = await HomeWork.find({}).populate(['postedBy','forClass']).catch(err=>res.json(err));
    res.json(hw);
})



route.delete('/:id',async (req,res)=>{
    await HomeWork.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route