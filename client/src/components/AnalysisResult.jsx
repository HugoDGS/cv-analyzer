import ScoreRing from './ScoreRing';
import SectionCard from './SectionCard';

export default function AnalysisResult({ data }) {
  return (
    <div className="result">
      <div className="result-header">
        <ScoreRing score={data.score} />
        <div className="result-summary">
          <h2>Analysis complete</h2>
          <p>{data.summary}</p>
        </div>
      </div>

      {data.job_match_score != null && (
        <div className="match-banner">
          <span className="match-label">Job match</span>
          <span className="match-score">{data.job_match_score}%</span>
          <p className="match-notes">{data.job_match_notes}</p>
        </div>
      )}

      <div className="result-grid">
        <div className="result-block">
          <h3 className="block-title strengths-title">✅ Strengths</h3>
          <ul className="result-list">
            {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="result-block">
          <h3 className="block-title weaknesses-title">⚠️ Weaknesses</h3>
          <ul className="result-list">
            {data.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </div>

      <div className="result-block">
        <h3 className="block-title">💡 Suggestions</h3>
        <ol className="result-list suggestions-list">
          {data.suggestions.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>

      {data.sections && (
        <div className="result-block">
          <h3 className="block-title">📋 Section review</h3>
          <div className="sections-grid">
            {Object.entries(data.sections).map(([id, section]) => (
              <SectionCard key={id} id={id} section={section} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
