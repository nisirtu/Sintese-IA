import { useState, useEffect } from 'react';

// Custom Hook para o efeito de "digitação"
const useTypewriter = (text, speed = 15) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText(''); // Reseta o texto ao receber novo conteúdo
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

// Componente para um único parágrafo com efeito de digitação
const TypewriterText = ({ text }) => {
  const displayText = useTypewriter(text);
  return <p>{displayText}</p>;
};

function SummaryDisplay({ data }) {
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (textToCopy, sectionName) => {
    // Para listas, junta os itens com quebra de linha
    const text = Array.isArray(textToCopy) ? textToCopy.join('\n') : textToCopy;
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  if (!data) return null;

  return (
    <div className="summary-display">
      <h2>Resumo Gerado</h2>

      <div className="summary-section">
        <div className="section-header">
          <h3>Resumo Geral</h3>
          <button onClick={() => handleCopy(data.resumo_geral, 'geral')} className="copy-button">
            {copiedSection === 'geral' ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        <TypewriterText text={data.resumo_geral} />
      </div>

      <div className="summary-section">
        <div className="section-header">
          <h3>Tópicos Principais</h3>
          <button onClick={() => handleCopy(data.topicos_principais, 'topicos')} className="copy-button">
            {copiedSection === 'topicos' ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        <ol>
          {data.topicos_principais.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ol>
      </div>

      <div className="summary-section">
        <div className="section-header">
          <h3>Pontos-Chave / Ações</h3>
          <button onClick={() => handleCopy(data.pontos_chave, 'pontos')} className="copy-button">
            {copiedSection === 'pontos' ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        <ol>
          {data.pontos_chave.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SummaryDisplay;
