import { useState, useRef } from 'react';

export default function UploadZone({ file, onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') onFile(f);
  };

  return (
    <div
      className={`upload-zone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={(e) => onFile(e.target.files[0])}
      />
      {file ? (
        <>
          <span className="upload-icon">📄</span>
          <p className="upload-filename">{file.name}</p>
          <p className="upload-hint">Click to change</p>
        </>
      ) : (
        <>
          <span className="upload-icon">⬆️</span>
          <p className="upload-title">Drop your CV here</p>
          <p className="upload-hint">PDF format · Click or drag & drop</p>
        </>
      )}
    </div>
  );
}
