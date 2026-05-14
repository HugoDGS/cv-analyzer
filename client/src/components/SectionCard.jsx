const COLORS = { good: '#22c55e', fair: '#f59e0b', poor: '#ef4444', missing: '#64748b' };
const LABELS = { good: 'Good', fair: 'Needs work', poor: 'Weak', missing: 'Missing' };
const NAMES = {
  contact: 'Contact Info', summary: 'Summary', experience: 'Experience',
  education: 'Education', skills: 'Skills', projects: 'Projects',
};

export default function SectionCard({ id, section }) {
  const color = COLORS[section.quality] || '#64748b';
  return (
    <div className="section-card">
      <div className="section-header">
        <span className="section-name">{NAMES[id] || id}</span>
        <span className="section-badge" style={{ color, borderColor: color }}>
          {LABELS[section.quality]}
        </span>
      </div>
      <p className="section-note">{section.note}</p>
    </div>
  );
}
