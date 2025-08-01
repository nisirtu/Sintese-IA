const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// A função agora aceita um "tone" (tipo) como parâmetro
const generateSummary = async (textToSummarize, tone = 'Profissional') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

    // Mapeia os tipos para instruções claras para a IA
    const toneInstructions = {
      'Profissional': 'um resumo formal e objetivo, focado em decisões e dados.',
      'Casual': 'um resumo em linguagem simples e amigável, como se estivesse a explicar para um colega.',
      'Tópicos': 'um resumo em formato de bullet points curtos e diretos, destacando apenas as informações essenciais.'
    };

    const prompt = `
      Você é um assistente de IA especialista em análise e síntese de conteúdo. Sua tarefa é ler o texto fornecido e criar ${toneInstructions[tone]}

      Extraia as seguintes informações:
      1. Um resumo geral.
      2. Os tópicos principais que são repetidos ou enfatizados.
      3. Os pontos-chave ou itens de ação mais importantes.

      Formate sua resposta EXATAMENTE como o objeto JSON a seguir, sem adicionar nenhum texto ou explicação antes ou depois do JSON.

      TEXTO FORNECIDO:
      """
      ${textToSummarize}
      """

      JSON DE SAÍDA:
      {
        "resumo_geral": "...",
        "topicos_principais": ["..."],
        "pontos_chave": ["..."]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiTextResponse = response.text();
    
    const cleanedJsonString = aiTextResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonData = JSON.parse(cleanedJsonString);

    return jsonData;

  } catch (error) {
    console.error("Erro no serviço da Gemini:", error);
    throw error;
  }
};

module.exports = {
  generateSummary,
};
