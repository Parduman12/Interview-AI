import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import mongoose from "mongoose";
import InterviewReportModel from "../models/interviewreport.model.js";

export const generateInterviewReportController = async(req, res)=>{
    console.log(req.file);
    console.log(req.body);
    let resumeText = "";
    if (req.file) {
        const parser = new PDFParse({data: req.file.buffer});
        const resumeContent = await parser.getText();
        resumeText = resumeContent.text || "";
    }

    const {selfDescription, jobDescription} = req.body

    const interviewReportByAI = await generateInterviewReport({resume: resumeText, selfDescription, jobDescription})
    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })
    res.status(201).json({
        message:"Interview report generated successfully.",
        interviewReport
    })

}


export const getInterviewReportByIdController = async(req,res)=>{
    const interviewId = req.params.interviewId;
    const interviewReport = await InterviewReportModel.findOne({_id:interviewId, user: req.user.id});
    if(!interviewReport){
        return res.status(404).json({message:"Interview report not found."})
    }
    res.status(200).json({
        message:"Interview report fetched successfully.",
        interviewReport
    })
}


export const getAllInterviewReportsController = async(req,res)=>{
    const interviewReports = await InterviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -v__v -updatedAt -user -createdAt -skillGap -preparationPlan -behavioralQuestions -technicalQuestions");
    res.status(200).json({
        message:"Interview reports fetched successfully.",
        interviewReports
    })
}

export const deleteInterviewReportController = async(req,res)=>{
    const interviewId = req.params.interviewId;
    const deletedReport = await InterviewReportModel.findOneAndDelete({_id:interviewId, user: req.user.id});
    if(!deletedReport){
        return res.status(404).json({message:"Interview report not found."})
    }
    res.status(200).json({
        message:"Interview report deleted successfully.",
        interviewId
    })
}