import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import InterviewReportUI from '../components/InterviewReportUI'
import { useInterview } from '../hooks/useInterview.jsx'
import { generateInterviewReport } from '../services/interview.api'
import { useNavigate } from 'react-router';
const Home = () => {
  const { handleLogout, user } = useAuth()
  const { loading, reports, generateReport, getAllReports, deleteReport } = useInterview();
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [resumeName, setResumeName] = useState('No file selected')
  const [modalErrors, setModalErrors] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const resumeInputRef = useRef();

  useEffect(() => {
    async function getReports() {
      await getAllReports();
    }
    getReports();
  }, [])

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeName(file.name)
    }
  }

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loader-text">Processing request...</p>
      </div>
    )
  }

  const handleSubmit = async () => {
    console.log('Generate interview report clicked')
    const resumeFile = resumeInputRef.current?.files?.[0];
    console.log('Resume file:', resumeFile);

    const errors = [];
    if (!jobDescription || !jobDescription.trim()) {
      errors.push("Job Description is required to align report recommendations.");
    }
    if (!resumeFile && (!selfDescription || !selfDescription.trim())) {
      errors.push("Please provide either your Resume (PDF) or a Self Description so we can parse your experience.");
    }

    if (errors.length > 0) {
      setModalErrors(errors);
      setIsModalOpen(true);
      return;
    }

    try {
      const data = await generateReport({ resumeFile, jobDescription, selfDescription });
      console.log('Generated interview report:', data);
      if (data && data._id) {
        navigate(`/interview/${data._id}`);
      }
    } catch (err) {
      console.error("Failed to generate report", err);
    }
  }

  return (
    <InterviewReportUI
      user={user}
      jobDescription={jobDescription}
      selfDescription={selfDescription}
      resumeName={resumeName}
      onJobDescriptionChange={(e) => setJobDescription(e.target.value)}
      onSelfDescriptionChange={(e) => setSelfDescription(e.target.value)}
      onResumeChange={handleResumeChange}
      resumeInputRef={resumeInputRef}
      onSubmit={handleSubmit}
      onLogout={handleLogout}
      reports={reports}
      isModalOpen={isModalOpen}
      modalErrors={modalErrors}
      onCloseModal={() => setIsModalOpen(false)}
      onDeleteReport={deleteReport}
    />
  )
}

export default Home
