import { useState, useRef } from 'react';

function PdfUploader({ onSubmit, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
    event.target.value = null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="pdf-uploader-container">
      {/* O input de arquivo real continua escondido */}
      <input
        type="file"
        accept=".pdf"
        // --- AQUI ESTÁ A CORREÇÃO ---
        ref={fileInputRef} 
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Se NENHUM arquivo estiver selecionado, mostra o botão de upload */}
      {!selectedFile && (
        <button type="button" onClick={handleSelectClick} disabled={isLoading} className="select-pdf-button">
          Selecionar PDF do Computador
        </button>
      )}

      {/* Se UM arquivo estiver selecionado, mostra a nova interface */}
      {selectedFile && (
        <div className="file-info-container">
          <span className="file-name">{selectedFile.name}</span>
          <button type="button" onClick={handleCancelFile} className="cancel-button" aria-label="Cancelar seleção">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <button type="submit" disabled={isLoading} className="submit-arrow-button" aria-label="Resumir PDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      )}
    </form>
  );
}

export default PdfUploader;
