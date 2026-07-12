import {getAllInterviewReports, generateInterviewReport, getInterviewReportById, deleteInterviewReport} from "../services/interview.api.js";
import { useContext } from "react";
import {InterviewContext} from "../interview.context.jsx"

export const useInterview = ()=>{
    const context = useContext(InterviewContext)
    if(!context){
        console.error("useInterview must be within the InterviewProvider");
    }
    const {loading, setLoading, report, setReport, reports, setReports} = context;
    const generateReport = async({resumeFile, jobDescription, selfDescription})=>{
        setLoading(true);
        console.log('Generating interview report with:', {jobDescription, selfDescription, resumeFile});
        let response = null;
        try {
            response = await generateInterviewReport({resume: resumeFile, jobDescription, selfDescription});
            console.log('Received response from API:', response);
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error generating interview report:", error);
        }
        finally {setLoading(false);
        }
        return response.interviewReport;

    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error fetching interview report:", error);
        }finally {setLoading(false);
        } 
        return response.interviewReport;
    }

    const getAllReports = async () => {
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.error("Error fetching interview reports:", error);
        }finally {setLoading(false);
        } 
        return response.interviewReports;
    }

    const deleteReport = async (interviewId) => {
        setLoading(true);
        try {
            await deleteInterviewReport(interviewId);
            setReports((prev) => prev.filter((r) => r._id !== interviewId));
        } catch (error) {
            console.error("Error deleting interview report:", error);
        } finally {
            setLoading(false);
        }
    }
    return {loading, report, reports,  generateReport, getReportById, getAllReports, deleteReport};
}
 