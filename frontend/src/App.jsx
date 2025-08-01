import { useState } from 'react';
import axios from 'axios';
import SummarizerForm from './components/SummarizerForm';
import SummaryDisplay from './components/SummaryDisplay';
import PdfUploader from './components/PdfUploader';
import VideoUrlForm from './components/VideoUrlForm';
import './index.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [mode, setMode] = useState('text');
  const [tone, setTone] = useState('Profissional');
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async (textToSummarize) => {
    setSummaryData(null);
    setError(null);
    setIsLoading(true);
    try {
      // --- ALTERAÇÃO AQUI ---
      const response = await axios.post(`${API_BASE_URL}/api/summarize`, {
        textToSummarize,
        tone,
      });
      setSummaryData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Não foi possível gerar o resumo.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarizePdf = async (file) => {
    setSummaryData(null);
    setError(null);
    setIsLoading(true);
    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('tone', tone);
    try {
      // --- ALTERAÇÃO AQUI ---
      const response = await axios.post(`${API_BASE_URL}/api/summarize-pdf`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSummaryData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Não foi possível processar o PDF.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarizeVideo = async (videoUrl) => {
    setSummaryData(null);
    setError(null);
    setIsLoading(true);
    try {
      // --- ALTERAÇÃO AQUI ---
      const response = await axios.post(`${API_BASE_URL}/api/summarize-video`, { videoUrl, tone });
      setSummaryData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Não foi possível processar o vídeo.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gemini-layout">
      <header className="app-header">
        <div className="logo-container">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 2V7H2V9H9V14H2V16H9V21H16V16H21V14H16V9H21V7H16V2H9ZM11 4H14V7H17V10H14V7H11V4ZM7 4H10V7H7V10H4V7H7V4ZM7 14H10V17H7V20H4V17H7V14ZM17 14H14V17H17V20H20V17H17V14Z" fill="#FFFFFF"/>
          </svg>
          <h1>Síntese IA</h1>
        </div>
      </header>

      <main className="main-content">
        {!summaryData && !isLoading && !error && (
          <div className="welcome-message">
            <h2>Bem-vindo!</h2>
            <p>Simplificamos a leitura: envie seus textos e economize tempo com resumos claros e eficientes.</p>
          </div>
        )}
        {isLoading && <div className="loading-indicator">Analisando o conteúdo...</div>}
        {error && <div className="error-message">Erro: {error}</div>}
        {summaryData && <SummaryDisplay data={summaryData} />}
      </main>

      <footer className="input-area">
        <div className="controls-container">
          <div className="mode-selector">
            <button className={mode === 'text' ? 'active' : ''} onClick={() => setMode('text')}>Texto</button>
            <button className={mode === 'pdf' ? 'active' : ''} onClick={() => setMode('pdf')}>PDF</button>
            <button className={mode === 'video' ? 'active' : ''} onClick={() => setMode('video')}>Vídeo</button>
          </div>
          <div className="tone-selector">
            <label htmlFor="tone">Tipo do Resumo:</label>
            <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="Profissional">Profissional</option>
              <option value="Casual">Casual</option>
              <option value="Tópicos">Em Tópicos</option>
            </select>
          </div>
        </div>
        
        {mode === 'text' && <SummarizerForm onSubmit={handleSummarize} isLoading={isLoading} />}
        {mode === 'pdf' && <PdfUploader onSubmit={handleSummarizePdf} isLoading={isLoading} />}
        {mode === 'video' && <VideoUrlForm onSubmit={handleSummarizeVideo} isLoading={isLoading} />}
      </footer>
    </div>
  );
}

export default App;