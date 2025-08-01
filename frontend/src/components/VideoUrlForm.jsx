import { useState } from 'react';

function VideoUrlForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');

  // A mesma função para auto-ajustar a altura
  const handleTextareaChange = (event) => {
    setUrl(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (url.trim() === '') return;
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="summarizer-form">
      <textarea
        value={url}
        onChange={handleTextareaChange} // Usamos a nova função aqui
        placeholder="Cole o link do vídeo do YouTube aqui..."
        required
        disabled={isLoading}
        rows={1}
      />
      <button type="submit" disabled={isLoading} aria-label="Gerar Resumo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </button>
    </form>
  );
}

export default VideoUrlForm;
