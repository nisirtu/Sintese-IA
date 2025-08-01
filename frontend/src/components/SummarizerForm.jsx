import { useState } from 'react';

function SummarizerForm({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  // Função para auto-ajustar a altura da textarea
  const handleTextareaChange = (event) => {
    setText(event.target.value);
    // Reseta a altura para 'auto' para que ela possa encolher se o texto for apagado
    event.target.style.height = 'auto';
    // Define a altura para a altura do conteúdo
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() === '') return;
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="summarizer-form">
      <textarea
        value={text}
        onChange={handleTextareaChange} // Usamos a nova função aqui
        placeholder="Cole seu texto aqui para começar..."
        required
        disabled={isLoading}
        rows={1} // Começa com uma única linha
      />
      <button type="submit" disabled={isLoading} aria-label="Gerar Resumo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </button>
    </form>
  );
}

export default SummarizerForm;
