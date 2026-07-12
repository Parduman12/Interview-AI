
import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.jsx'
import { useParams, Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Interview = () => {
	const {report, getReportById} = useInterview();
	const {user, handleLogout} = useAuth();
	const {interviewId} = useParams();
	useEffect(() => {
		async function getreport() {
			await getReportById(interviewId)
		}
		if (!report || report._id !== interviewId) {
			getreport();
		}
	}, [interviewId])
	
	

	const [open, setOpen] = useState(null)

	const [activeTab, setActiveTab] = useState('technical') // 'technical' | 'behavioral' | 'preparationPlan'

	const renderQuestions = (list, prefix = 'Q') => (
		<div className="questions-list">
			{list.map((q, idx) => {
				const keyId = `${prefix}-${idx}`;
				const isOpen = open === keyId;
				return (
					<article key={keyId} className={`qa-card ${isOpen ? 'open' : ''}`}>
						<button className="qa-toggle" onClick={() => setOpen(isOpen ? null : keyId)}>
							<div className="qa-left">
								<div className="qa-number">{prefix}{idx + 1}</div>
								<div className="qa-title">{q.question}</div>
							</div>
							<div className="qa-chevron">{isOpen ? '▴' : '▾'}</div>
						</button>

						{isOpen && (
							<div className="qa-body">
								<div className="intention"><strong>INTENTION</strong><p>{q.intention}</p></div>
								<div className="model-answer">
									<div className="label">MODEL ANSWER</div>
									<p>{q.answer}</p>
								</div>
							</div>
						)}
					</article>
				);
			})}
		</div>
	)

	const score = report?.matchScore || 0;
	const getScoreColor = (val) => {
		if (val >= 80) return '#2ad07d';
		if (val >= 50) return '#e0a927';
		return '#ef4444';
	};
	const scoreColor = getScoreColor(score);
	const getMatchLabel = (val) => {
		if (val >= 80) return 'Strong match for this role';
		if (val >= 50) return 'Good match for this role';
		return 'Requires skill updates';
	};

	return (
		<div className="interview-page">
			<header className="topbar">
				<Link to="/" className="brand">InterviewAI</Link>
				<nav className="topnav">
					<Link to="/">Generate Report</Link>
					<Link to={`/interview/${interviewId}`} className="active">Report Dashboard</Link>
				</nav>
				<div className="topbar-actions">
					{user && (
						<div className="user-profile-widget">
							<div className="profile-avatar">
								{user?.username ? user.username[0].toUpperCase() : 'U'}
							</div>
							<div className="profile-info">
								<span className="name">{user?.username || 'Candidate'}</span>
								<span className="role">{user?.email || 'User'}</span>
							</div>
						</div>
					)}
					<button className="top-actions logout-action-btn" onClick={handleLogout}>Logout</button>
				</div>
			</header>

			<div className="interview-grid">
				<aside className="sidebar">
					<div className="sections">
						<div className={`section ${activeTab === 'technical' ? 'active' : ''}`} onClick={() => setActiveTab('technical')}>&lt;/&gt; Technical Questions</div>
						<div className={`section ${activeTab === 'behavioral' ? 'active' : ''}`} onClick={() => setActiveTab('behavioral')}>Behavioral Questions</div>
						<div className={`section ${activeTab === 'preparationPlan' ? 'active' : ''}`} onClick={() => setActiveTab('preparationPlan')}>Road Map</div>
					</div>
				</aside>

				<main className="content">
					<div className="report-title-header">
						<span className="report-title-eyebrow">Analysis Report</span>
						<h1 className="report-title">{report?.title || 'Job Readiness Analysis'}</h1>
					</div>
					<div className="content-header">
						<h2>
							{activeTab === 'technical' && <>Technical Questions <span className="chip">{report?.technicalQuestions?.length || 0} questions</span></>}
							{activeTab === 'behavioral' && <>Behavioral Questions <span className="chip">{report?.behavioralQuestions?.length || 0} questions</span></>}
							{activeTab === 'preparationPlan' && <>Preparation Road Map <span className="chip">7-day plan</span></>}
						</h2>
					</div>

					<div className="content-body">
						{activeTab === 'technical' && renderQuestions(report?.technicalQuestions || [], 'Q')}
						{activeTab === 'behavioral' && renderQuestions(report?.behavioralQuestions || [], 'B')}

						{activeTab === 'preparationPlan' && (
							<div className="preparationPlan">
								<ol className="timeline">
									{report?.preparationPlan?.map((r) => (
										<li key={r.day} className="timeline-item">
											<div className="timeline-marker" />
											<div className="timeline-content">
												<div className="timeline-day">Day {r.day}</div>
												<div className="timeline-title">{r.focus}</div>
												<ul className="timeline-bullets">
													{r.tasks.map((b, i) => <li key={i}>{b}</li>)}
												</ul>
											</div>
										</li>
									))}
								</ol>
							</div>
						)}
					</div>
				</main>

				<aside className="rightpanel">
					<div className="score-card">
						<div className="score-title">MATCH SCORE</div>
						<div className="score-ring" style={{
							background: `conic-gradient(${scoreColor} 0% ${score}%, rgba(255, 255, 255, 0.06) ${score}% 100%)`
						}}>
							<div className="score-value">{score}%</div>
						</div>
						<div className="score-text" style={{ color: scoreColor }}>{getMatchLabel(score)}</div>
					</div>

					<div className="gaps-card">
						<div className="gaps-title">SKILL GAPS</div>
						{/* <div className="gap high">
							<div className="gap-title">Message Queues (Kafka/RabbitMQ)</div>
							<div className="gap-desc">No commercial experience mentioned.</div>
						</div>
						<div className="gap mid">
							<div className="gap-title">Advanced Docker & CI/CD Pipelines</div>
							<div className="gap-desc">Basic usage only; lacks scale-up exposure.</div>
						</div> */}
						{report?.skillGap?.map((gap, idx) => (
							<div key={idx} className={`gap ${gap.severity || 'high'}`}>
								<div className="gap-title">{gap.skill}</div>
								{/* <div className="gap-desc">No commercial experience mentioned.</div> */}
							</div>
						))}


					</div>
				</aside>
			</div>
		</div>
	)
}

export default Interview
