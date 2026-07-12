import mongoose, { mongo } from 'mongoose';


const behavioralQuestionsSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true, "Technical question is required"]
    },
    intention:{
        type:String,
        required:[true, "Intention is required."]
    },
    answer:{
        type:String,
        required:[true,"Answer is required."]
    }
},{
    _id:false
})

const technicalQuestionsSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true, "Technical question is required"]
    },
    intention:{
        type:String,
        required:[true, "Intention is required."]
    },
    answer:{
        type:String,
        required:[true,"Answer is required."]
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required:[true, "Skill is required"]
    },
    severity:{
        type:String,
        enum: ["low", "medium", "high"],
        required:[true,"Severity is required."]

    }
},{
    _id:false
})


const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true, "day number is required."]
    },
    focus:{
        type:String,
        required:[true, "Focus is required."]
    },
    tasks:[{
        type:String, 
        required: [true,"Task is required."]
    }]
})



const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        required:[true, "Job description is required"],
        type:String,


    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max: 100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    title:{
        type: String,
        required:[true, "Title is required"]
    }
},{
    timestamps:true
})

export default mongoose.model("InterviewReportModel", interviewReportSchema)