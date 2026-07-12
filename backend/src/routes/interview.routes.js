import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { generateInterviewReportController, getAllInterviewReportsController, getInterviewReportByIdController, deleteInterviewReportController } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

const interviewRouter = Router();

interviewRouter.route("/").post(authUser, upload.single("resume"), generateInterviewReportController)

interviewRouter.route("/report/:interviewId")
    .get(authUser, getInterviewReportByIdController)
    .delete(authUser, deleteInterviewReportController)

interviewRouter.route("/").get(authUser, getAllInterviewReportsController)

export default interviewRouter;