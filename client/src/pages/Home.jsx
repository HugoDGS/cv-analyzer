import { useState } from 'react';
import UploadZone from '../components/UploadZone';
import AnalysisResult from '../components/AnalysisResult';
import { analyzeCV } from '../api';

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await analyzeCV(file, jobDesc);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setJobDesc('');
    setError('');
  };

  return (
    <div className="page">
      <header className="header">
        <h1>CV Analyzer</h1>
        <p>Get AI-powered feedback on your resume in seconds</p>
      </header>

      <main>
        {!result ? (
          <>
            <UploadZone file={file} onFile={setFile} />

            <div className="job-section">
              <label className="field-label">Job description (optional)</label>
              <textarea
                className="job-input"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description to get a compatibility score..."
                rows={5}
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button
              className="btn-analyze"
              onClick={handleAnalyze}
              disabled={!file || loading}
            >
              {loading
                ? <span className="loading-dots">Analyzing<span>...</span></span>
                : 'Analyze CV'}
            </button>
          </>
        ) : (
          <>
            <button className="btn-back" onClick={handleReset}>← Analyze another CV</button>
            <AnalysisResult data={result} />
          </>
        )}
      </main>
    </div>
  );
}
