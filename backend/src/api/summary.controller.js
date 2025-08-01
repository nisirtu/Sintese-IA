const geminiService = require('../services/gemini.service');
const pdf = require('pdf-parse');
const { YoutubeTranscript } = require('youtube-transcript');

// --- FUNÇÃO DE SUMARIZAÇÃO DE TEXTO ---
const handleSummarize = async (req, res) => {
  try {
    const { textToSummarize, tone } = req.body;
    if (!textToSummarize || textToSummarize.trim() === '') {
      return res.status(400).json({ message: 'O campo "textToSummarize" é obrigatório.' });
    }
    const summaryData = await geminiService.generateSummary(textToSummarize, tone);
    res.status(200).json(summaryData);
  } catch (error) {
    console.error("Erro no controlador de texto:", error);
    if (error.status === 429) {
      return res.status(429).json({ message: 'Limite de requisições à API atingido. Tente novamente mais tarde.' });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao processar a solicitação.' });
  }
};

// --- FUNÇÃO DE SUMARIZAÇÃO DE PDF ---
const handleSummarizePdf = async (req, res) => {
  try {
    const { tone } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo PDF foi enviado.' });
    }
    const data = await pdf(req.file.buffer);
    const textToSummarize = data.text;
    if (!textToSummarize || textToSummarize.trim() === '') {
        return res.status(400).json({ message: 'Não foi possível extrair texto deste PDF.' });
    }
    const summaryData = await geminiService.generateSummary(textToSummarize, tone);
    res.status(200).json(summaryData);
  } catch (error) {
    console.error("Erro no controlador de PDF:", error);
    if (error.status === 429) {
      return res.status(429).json({ message: 'Limite de requisições à API atingido. Tente novamente mais tarde.' });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao processar o PDF.' });
  }
};

// --- FUNÇÃO DE SUMARIZAÇÃO DE VÍDEO ---
const handleSummarizeVideo = async (req, res) => {
  try {
    const { videoUrl, tone } = req.body;
    if (!videoUrl) {
      return res.status(400).json({ message: 'A URL do vídeo é obrigatória.' });
    }
    const transcriptParts = await YoutubeTranscript.fetchTranscript(videoUrl);
    const fullTranscript = transcriptParts.map(part => part.text).join(' ');
    if (!fullTranscript) {
        return res.status(400).json({ message: 'Não foi possível encontrar legendas para este vídeo.' });
    }
    const summaryData = await geminiService.generateSummary(fullTranscript, tone);
    res.status(200).json(summaryData);
  } catch (error) {
    console.error("Erro no controlador de vídeo:", error);
    if (error.status === 429) {
      return res.status(429).json({ message: 'Limite de requisições à API atingido. Tente novamente mais tarde.' });
    }
    res.status(500).json({ message: 'Não foi possível processar o vídeo. Verifique o link ou se o vídeo possui legendas.' });
  }
};

// Exporta todas as três funções
module.exports = {
  handleSummarize,
  handleSummarizePdf,
  handleSummarizeVideo,
};
