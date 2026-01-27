import { useState } from 'react'
import InputSection from './components/InputSection'
import SummaryPreview from './components/SummaryPreview'

function App() {
  const [data, setData] = useState({
    diapersWet: '',
    diapersDirty: '',
    meals: '',
    sleep: '',
    mood: '',
    activities: '',
    health: '',
    notes: '',
    photos: []
  })
  const [generatedSummary, setGeneratedSummary] = useState('')

  const handleUpdate = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = () => {
    // Friendly "Parenting App" Style Template
    const summary = `Harper's Day Summary
${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}

Here is a quick update on Harper's time with me.

🍎 EAT & SLEEP
• Meals: ${data.meals || "Standard meals."}
• Sleep: ${data.sleep || "Normal sleep schedule."}
• Diapers: ${data.diapersWet ? `${data.diapersWet} wet` : 'Standard'} / ${data.diapersDirty ? `${data.diapersDirty} dirty` : 'Standard'}

✨ MOOD & FUN
• Mood: ${data.mood || "Happy"}
• Highlights: ${data.activities || "Just playing and hanging out."}

📝 NOTES
${data.notes || "No specific notes for today."}`
    setGeneratedSummary(summary)
  }

  return (
    <div className="app-shell">
      {/* Navigation Header */}
      <nav className="navbar no-print">
        <div className="container nav-container">
          <div className="brand">PLACED.CA</div>
          <div className="nav-links">
            <a href="#">Dashboard</a>
            <a href="#">Calendar</a>
            <a href="#">Communication Hub</a>
            <a href="#">Blog</a>
            <a href="#" className="active">TOOLS & LOGS</a>
            <div className="user-avatar">G</div>
          </div>
        </div>
      </nav>

      <main className="container main-content">
        <div className="page-header no-print">
          <h1>TRANSITION SUMMARY GENERATOR</h1>
          <p>Turn your notes, and photos, into a clear, neutral summary for your co-parent.</p>
        </div>

        <div className="grid-layout">
          <section className="input-zone no-print">
            <div className="card-header">
              <h2>YOUR NOTES & PHOTOS</h2>
              <p>Ramble on about your day. Add some photos. The AI will handle the rest.</p>
            </div>
            <InputSection
              data={data}
              onUpdate={handleUpdate}
              onGenerate={handleGenerate}
            />
          </section>

          <section className="preview-zone">
            <div className="card-header no-print">
              <h2>AI-GENERATED SUMMARY</h2>
              <p>Your professional, AI-generated summary will appear here.</p>
            </div>
            <SummaryPreview
              data={data}
              summary={generatedSummary}
              onSummaryChange={setGeneratedSummary}
            />
          </section>
        </div>

        <div className="tip-banner no-print">
          <div className="tip-icon">💡</div>
          <div className="tip-content">
            <h3>CO-PARENTING TIP</h3>
            <p>When messaging, try using 'I' statements instead of 'you' statements to avoid sounding accusatory. For example, 'I was concerned when pickup was late' instead of 'You were late again.'</p>
          </div>
        </div>
      </main>

      {/* Button to Print (Absolute or Sticky) */}
      <button className="fab-print no-print" onClick={() => window.print()} title="Print Summary">
        🖨️
      </button>

      <style>{`
        .navbar {
          background: white;
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0;
          padding-bottom: 0;
        }
        .brand {
          font-weight: 900;
          font-size: 1.5rem;
          color: var(--brand-purple);
          letter-spacing: -0.05em;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
        }
        .nav-links a.active {
          color: var(--brand-purple);
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          background: #e5e7eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: var(--text-muted);
        }

        .main-content {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .page-header h1 {
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .page-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .card-header {
          margin-bottom: 1.5rem;
        }
        .card-header h2 {
          font-size: 1rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-main);
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .card-header p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .tip-banner {
          background: var(--secondary);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          color: white; /* Or black depending on contrast, yellow usually needs dark text */
          color: #713f12; /* Darker yellow/brown text */
          background: #fef08a; /* Lighter yellow bg */
        }
        .tip-icon {
          font-size: 1.5rem;
        }
        .tip-content h3 {
          font-size: 0.9rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }
        .tip-content p {
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .fab-print {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          border: none;
          font-size: 1.5rem;
          box-shadow: var(--shadow-lg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: transform 0.2s;
        }
        .fab-print:hover {
          transform: scale(1.1);
        }

        @media print {
          .no-print { display: none !important; }
          .grid-layout { display: block; }
          .main-content { padding: 0; }
        }
      `}</style>
    </div>
  )
}

export default App
