import { useState } from 'react'

function InputSection({ data, onUpdate, onGenerate }) {
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const newPhotos = files.map(file => URL.createObjectURL(file))
      onUpdate('photos', [...data.photos, ...newPhotos])
    }
  }

  return (
    <div className="input-card-content">

      <div className="input-group">
        <label>Your Notes</label>
        <textarea
          placeholder="Detailed notes regarding diapers, meals, sleep, mood..."
          value={data.notes} /* Note: Ideally we map granular fields here too, but for UI match we simplified. Let's keep granular but styled cleanly. */
          onChange={(e) => onUpdate('notes', e.target.value)}
          className="main-textarea"
        />
        <div className="granular-toggles">
          {/* We can show granular inputs as a secondary step or accordion if needed, 
               but strictly following the screenshot implies a big textarea. 
               However, user ASKED for granular. I will keep granular but style them subtly below.
           */}
          <div className="mini-grid">
            <input type="text" placeholder="Wet/Dirty Diapers" value={data.diapersWet} onChange={e => onUpdate('diapersWet', e.target.value)} />
            <input type="text" placeholder="Meals" value={data.meals} onChange={e => onUpdate('meals', e.target.value)} />
            <input type="text" placeholder="Sleep" value={data.sleep} onChange={e => onUpdate('sleep', e.target.value)} />
            <select value={data.mood} onChange={e => onUpdate('mood', e.target.value)}>
              <option value="">Mood...</option>
              <option value="Happy">Happy</option>
              <option value="Fussy">Fussy</option>
              <option value="Tired">Tired</option>
            </select>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label>Add Photos</label>
        <div className="photo-upload-zone">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-box">
            <div className="icon">⬆️</div>
            <span>Click or tap to upload photos</span>
          </label>
        </div>
        {data.photos.length > 0 && (
          <div className="photo-grid">
            {data.photos.map((src, i) => (
              <div key={i} className="photo-thumb" style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
        )}
      </div>

      <button className="btn-generate-full" onClick={onGenerate}>
        GENERATE SUMMARY
      </button>

      <style>{`
        .input-card-content {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
        }
        
        .input-group {
          margin-bottom: 2rem;
        }
        
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .main-textarea {
          width: 100%;
          min-height: 200px;
          padding: 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          resize: vertical;
          font-family: inherit;
          margin-bottom: 1rem;
        }

        .mini-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        .mini-grid input, .mini-grid select {
          padding: 0.5rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }

        .upload-box {
          border: 2px dashed var(--border);
          border-radius: var(--radius-sm);
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          display: block;
          transition: background 0.2s;
        }
        .upload-box:hover {
          background: #f9fafb;
          border-color: var(--brand-purple);
        }
        .upload-box .icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .btn-generate-full {
          width: 100%;
          background: var(--brand-purple);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-generate-full:hover {
          background: var(--primary-hover);
        }

        .photo-grid { margin-top: 1rem; }
      `}</style>
    </div>
  )
}

export default InputSection
