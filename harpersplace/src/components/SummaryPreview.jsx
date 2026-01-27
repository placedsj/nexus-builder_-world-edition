import { useEffect, useRef } from 'react'

function SummaryPreview({ data, summary, onSummaryChange }) {
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [summary])

  return (
    <div className="preview-card-content">
      <div className="paper-sheet">
        {/* We can add a header to the paper if we want the output to look branded too, 
            but usually courts prefer plain. Keeping plain for now. */}

        {(!summary && data.photos.length === 0) ? (
          <div className="empty-state">
            <p>Ready to generate.</p>
          </div>
        ) : (
          <>
            <textarea
              ref={textareaRef}
              className="paper-content"
              value={summary}
              onChange={(e) => onSummaryChange(e.target.value)}
              placeholder="Summary will appear here..."
            />

            {data.photos.length > 0 && (
              <div className="paper-photos">
                {data.photos.map((src, i) => (
                  <div key={i} className="photo-item">
                    <img src={src} alt="Evidence" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .preview-card-content {
          background: white; /* Card bg is white, but maybe allow contrast? */
          /* Actually, the screenshot showed the Right card as specific area. */
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .paper-sheet {
          background: white;
          width: 100%;
          min-height: 400px;
          border-radius: var(--radius-sm);
          padding: 2rem;
          border: 1px solid var(--border);
          position: relative;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-muted);
          font-style: italic;
        }

        .paper-content {
          width: 100%;
          border: none;
          resize: none;
          font-family: 'Inter', system-ui, sans-serif; /* Modern look */
          font-size: 11pt;
          line-height: 1.6;
          outline: none;
          background: transparent;
          overflow: hidden;
          white-space: pre-wrap;
          color: #374151; /* Softer black */
        }

        .paper-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 2rem;
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }
        .photo-item img {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid #ddd;
        }

        @media print {
          .preview-card-content {
            display: block;
          }
          .paper-sheet {
            border: none;
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default SummaryPreview
