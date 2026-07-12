import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "The match score is a number between 0 and 100 that indicates how well the candidate's profile matches the job description. A higher score indicates a better match."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions are asked in interview to assess the candidate's technical skills and problem solving ability.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The technical question can be asked in interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The intention of the interviewer behind asking this question."
                    },
                    answer: {
                        type: Type.STRING,
                        description: "How to answer this question? What are the key points to be covered in the answer? What are the common mistakes to avoid while answering this question? Provide a sample answer for this question."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions are asked in interview to assess the candidate's soft skills, cultural fit and problem solving approach.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The behavioral question can be asked in interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The intention of the interviewer behind asking this question."
                    },
                    answer: {
                        type: Type.STRING,
                        description: "How to answer this question? What are the key points to be covered in the answer? What are the common mistakes to avoid while answering this question? Provide a sample answer for this question."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGap: {
            type: Type.ARRAY,
            description: "Skill gaps are the areas where the candidate lacks the required skills based on the job description and candidate's profile.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING,
                        description: "The skill which the candidate is lacking based on the job description and candidate's profile."
                    },
                    severity: {
                        type: Type.STRING,
                        enum: ["low", "medium", "high"],
                        description: "The severity of the skill gap. It can be low, medium or high."
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "The preparation plan is a 7-day plan to prepare for the interview based on the technical questions, behavioral questions and skill gaps identified in the interview report.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: {
                        type: Type.NUMBER,
                        description: "The day number of the preparation plan. It can be from 1 to 7."
                    },
                    focus: {
                        type: Type.STRING,
                        description: "The focus of the preparation plan for that day. It can be technical skills, behavioral skills or both."
                    },
                    tasks: {
                        type: Type.ARRAY,
                        description: "The tasks to be performed on that day to prepare for the interview.",
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title:{
            type: Type.STRING,
            description: "The title of the interview report. It can be the job title or any other relevant title."
        }

    },
    
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGap", "preparationPlan", "title"]
};

async function generateInterviewReport({resume, jobDescription, selfDescription}) {
    const prompt = `You are an expert career coach. Based on the following job description, candidate's resume and self describe, generate a comprehensive interview report:
        Here is the job description:
        ${jobDescription}
        Here is the candidate's resume:
        ${resume}
        Here is the candidate's self describe:
        ${selfDescription}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            // Pass the schema object directly
            responseSchema: interviewReportSchema
        }
    });
    console.log(response.text);
    return JSON.parse(response.text);
}

export default generateInterviewReport;