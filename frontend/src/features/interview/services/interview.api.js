import axios from "axios";
const api = axios.create({
    baseURL:  "http://localhost:3000",
    withCredentials: true,
});
export const generateInterviewReport = async ({resume, jobDescription, selfDescription}) => {
    try {
        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        const response = await api.post("/api/interview/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
};


export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching interview report:", error);
        throw error;
    }
}


export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview/", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching interview reports:", error);
        throw error;
    }
}

export const deleteInterviewReport = async (interviewId) => {
    try {
        const response = await api.delete(`/api/interview/report/${interviewId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting interview report:", error);
        throw error;
    }
}