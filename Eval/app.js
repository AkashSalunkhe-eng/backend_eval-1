const express = require("express");
const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb://localhost:27017/jobs");
};

const app = express();
app.use(express.json());

const companySchema = new mongoose.Schema(
    {
        company_name:{type:String,required:true},
        company_details:{type:String,required:true},
        jobs_in_company:{type:Number,required:true}
    },
    {
        versionKey:false,
        timestamps:true
    }
)


const Company = mongoose.model("company",companySchema);

const jobSchema = new mongoose.Schema(
    {
      job_domain:{type:String,required:true},
      job_city:{type:String,required:true},
      job_skill:{type:String,required:true},
      work_from_home:{type:String,required:true},
      notice_period:{type:String,required:true},
      rating:{type:Number,required:true},  
    },
    {
        versionKey:false,
        timestamps:true
    }
)

const Job = mongoose.model("job",jobSchema);


// ------------------- Company Crud ----------------

app.post("/company",async (req,res)=>{
try{
    const company = await Company.create(req.body);

    return res.status(201).send(company);
}catch(e){
    return res.status(500).json({message:e.message,status:"failed"});
}
});

app.get("/company",async(req,res)=>{ 
    try{
        const company = await Company.find().lean().exec();

        return res.status(201).send(company);
    }catch(e){

        return res.status(500).json({message:e.message,status:"failed"});
    }
});


app.get("/company_details",async(req,res)=>{  ///Getting All Company details
    try{
        const company = await Company.find({},{"company_details":1}).lean().exec();

        return res.status(201).send(company);
    }catch(e){

        return res.status(500).json({message:e.message,status:"failed"});
    }
});

app.get("/company/:id", async (req,res)=>{
    try{
        const company = await Company.findById(req.params.id).lean().exec();

        return res.send(company)
    }catch(e){

         return res.status(500).json({message:e.message,status:"failed"});

    }
});

app.get("/company_jobs",async(req,res)=>{ // Most jobs api endPoint
    try{
        const company = await Company.find({"jobs_in_company":{$gt:7}}).lean().exec();

        return res.status(201).send(company);
    }catch(e){

        return res.status(500).json({message:e.message,status:"failed"});
    }
});






app.patch("/company/:id",async(req,res)=>{
    try{
        const company = await Company.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec()

        return res.status(201).send(company)
    } catch(e){

            return res.status(500).json({message:e.message,status:"failed"});
    }
});

app.delete("/company/:id",async(req,res)=>{
    try{
        const company = await Company.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(company);
    }catch(e){

        return res.status(500).json({message:e.message,status:"failed"});

    }
});


// --------------------- Jobs Crud -------------------------

app.post("/jobs",async (req,res)=>{
    try{
        const jobs = await Job.create(req.body);
    
        return res.status(201).send(jobs);
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"});
    }
    });
    
    app.get("/jobs",async(req,res)=>{
        try{
            const jobs = await Job.find().lean().exec();
    
            return res.status(201).send(jobs);
        }catch(e){
    
            return res.status(500).json({message:e.message,status:"failed"});
        }
    });

   

    app.get("/jobs_rat",async(req,res)=>{// Jobs sorted as per their rating in descending order
        try{
            const jobs = await Job.find().sort({"rating":-1}).lean().exec();
    
            return res.status(201).send(jobs);
        }catch(e){
    
            return res.status(500).json({message:e.message,status:"failed"});
        }
    });

    app.get("/jobs_notice_p",async(req,res)=>{ // Getting all Jobs with notice period of 2 month
        try{
            const jobs = await Job.find({"notice_period":{$eq:"2 month"}}).lean().exec();
    
            return res.status(201).send(jobs);
        }catch(e){
    
            return res.status(500).json({message:e.message,status:"failed"});
        }
    });

    app.get("/jobs_wfh",async(req,res)=>{ // Getting all Jobs with Work From Home Available
        try{
            const jobs = await Job.find({"work_from_home":{$eq:"Available"}}).lean().exec();
    
            return res.status(201).send(jobs);
        }catch(e){
    
            return res.status(500).json({message:e.message,status:"failed"});
        }
    });

    
    
    app.get("/jobs/:id", async (req,res)=>{ 
        try{
            const jobs = await Job.findById(req.params.id).lean().exec();
    
            return res.send(jobs)
        }catch(e){
    
             return res.status(500).json({message:e.message,status:"failed"});
    
        }
    });
    
    app.patch("/jobs/:id",async(req,res)=>{
        try{
            const jobs = await Job.findByIdAndUpdate(req.params.id,req.body,{
                new:true,
            }).lean().exec()
    
            return res.status(201).send(jobs)
        } catch(e){
    
                return res.status(500).json({message:e.message,status:"failed"});
        }
    });
    
    app.delete("/jobs/:id",async(req,res)=>{
        try{
            const jobs = await Job.findByIdAndDelete(req.params.id).lean().exec();
    
            return res.status(200).send(jobs);
        }catch(e){
    
            return res.status(500).json({message:e.message,status:"failed"});
    
        }
    })

app.listen((2121), async function(){
    connect();
    console.log("Listening to port 2121");
});


