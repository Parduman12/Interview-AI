import React from 'react';
import { useNavigate } from 'react-router';
import '../style/interview-ui.scss';
 
const InterviewReportUI = ({
  user = null,
  jobDescription = '',
  selfDescription = '',
  resumeName = 'No file selected',
  onJobDescriptionChange = () => {},
  onSelfDescriptionChange = () => {},
  resumeInputRef = null,
  onResumeChange = () => {},
  onSubmit = () => {},
  onLogout = () => {},
  reports = [],
  isModalOpen = false,
  modalErrors = [],
  onCloseModal = () => {},
  onDeleteReport = () => {},
}) => {
  const navigate = useNavigate();
  const getMatchLabel = (score) => {
    if (score >= 80) return 'Strong fit';
    if (score >= 50) return 'Good fit';
    return 'Review strengths';
  };

  const handleViewReport = (interviewId) => {
    navigate(`/interview/${interviewId}`);
  };

  return (
    <main className="interview-report-ui">
      {isModalOpen && (
        <div className="modal-backdrop" onClick={onCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-icon">⚠️</span>
              <h2>Missing Required Details</h2>
            </div>
            <div className="modal-body">
              <p className="modal-intro">To generate an accurate match score and custom road map, please complete the following:</p>
              <ul className="modal-errors-list">
                {modalErrors.map((err, idx) => (
                  <li key={idx} className="modal-error-item">
                    <span className="bullet-point">•</span> {err}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button className="primary-button modal-close-btn" type="button" onClick={onCloseModal}>
                Got it, let's fix it
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="interview-report-ui__header">
        <div className="interview-report-ui__header-copy">
          <p className="eyebrow">InterviewAI</p>
          <h1>Generate Report</h1>
          <p className="subtitle">
            Leverage professional-grade AI to analyze candidates against your specific requirements and generate comprehensive readiness reports.
          </p>
        </div>
        <div className="interview-report-ui__header-actions">
          {user && (
            <div className="user-greeting">
              <span className="user-greeting__avatar">{user.username ? user.username[0].toUpperCase() : 'U'}</span>
              <span className="user-greeting__name">Hello, {user.username}!</span>
            </div>
          )}
          <button className="primary-button logout-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="interview-report-ui__grid">
        <div className="panel panel--large">
          <div className="panel__header">
            <div className="panel__title-row">
              <h2>Job Description</h2>
              <span className="field-label field-label--required">Required</span>
            </div>
            <p>Paste the full job requirements, core responsibilities, and qualifications here for the most accurate AI analysis.</p>
          </div>
          <textarea
            className="panel__textarea"
            name="jobDescription"
            aria-label="Job description"
            placeholder="Enter job description here..."
            value={jobDescription}
            onChange={onJobDescriptionChange}
          />
        </div>

        <div className="panel panel--stacked">
          <div className="panel__section">
            <div className="panel__section-header">
              <div>
                <h3>Resume</h3>
                <span className="field-label field-label--optional">Optional (Provide Resume or Self Description)</span>
              </div>
            </div>
            <label className="upload-card" htmlFor="resumeUpload">
              <div className="upload-card__icon">📄</div>
              <p className="upload-card__title">Drop your resume here</p>
              <p className="upload-card__hint">PDF</p>
              <button type="button" className="secondary-button non-click-button">Browse Files</button>
              <p className="upload-card__filename">{resumeName}</p>
            </label>
            <input
              id="resumeUpload"
              type="file"
              accept=".pdf"
              hidden
              ref={resumeInputRef}
              onChange={onResumeChange}
            />
          </div>

          <div className="panel__section panel__section--secondary">
            <div className="panel__section-header">
              <div>
                <h3>Self Description</h3>
                <span className="field-label field-label--optional">Optional (Provide Resume or Self Description)</span>
              </div>
            </div>
            <textarea
              className="panel__textarea"
              name="selfDescription"
              aria-label="Self description"
              placeholder="Describe yourself in a few sentences..."
              value={selfDescription}
              onChange={onSelfDescriptionChange}
            />
          </div>
        </div>
      </section>

      <div className="interview-report-ui__footer">
        <button className="primary-button submit-btn" type="button" onClick={onSubmit}>
          Generate Interview Report
        </button>
      </div>
      <section className="reports-section">
        <div className="reports-section__header">
          <div>
            <h2>Previous Interview Reports</h2>
            <p>Access your past interview analyses and track your progress over time.</p>
          </div>
          <span className="reports-count">{reports.length} reports</span>
        </div>
        <div className="reports-list">
          {reports.length === 0 ? (
            <div className="reports-empty">
              <p>No previous reports found.</p>
              <p>Once you generate your first report, it will appear here with a quick summary and match score.</p>
            </div>
          ) : (
            reports.map((report) => (
              <article key={report._id} className="report-card">
                <div className="report-card__top">
                  <div className="report-card__badge">{report.matchScore ?? '--'}%</div>
                  <div className="report-card__label">Match score</div>
                </div>
                <h3 className="report-card__title">{report.title || 'Interview Report'}</h3>
                <p className="report-card__subtitle">Saved analysis for this role and candidate profile.</p>
                <div className="report-card__footer">
                  <span className="report-card__status">{getMatchLabel(report.matchScore)}</span>
                  <div className="report-card__actions">
                    <button
                      type="button"
                      className="secondary-button report-card__view-button"
                      onClick={() => handleViewReport(report._id)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="danger-button report-card__delete-button"
                      title="Delete Report"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Are you sure you want to delete this report?")) {
                          onDeleteReport(report._id);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default InterviewReportUI;
