# 🧠 Síntese IA - Resumos Inteligentes

![Status do Projeto](https://img.shields.io/badge/status-concluído-green)

> Uma aplicação web full-stack que utiliza a API do Google Gemini para gerar resumos inteligentes e estruturados a partir de diversas fontes de conteúdo, incluindo texto, ficheiros PDF e vídeos do YouTube.

---

### ✨ Funcionalidades Principais

- **Sumarização Multi-Fonte:** Capaz de processar e resumir conteúdo a partir de:
  - **Texto Puro:** Cole qualquer artigo, transcrição ou documento.
  - **Ficheiros PDF:** Faça o upload de um ficheiro PDF para extrair e resumir o seu conteúdo textual.
  - **Vídeos do YouTube:** Forneça um link de um vídeo para obter um resumo baseado na sua transcrição.
- **Controlo de Tipo de Resumo:** O utilizador pode escolher o estilo do resumo gerado pela IA, selecionando entre os tipos: "Profissional", "Casual" ou "Em Tópicos".
- **Interface Reativa e Moderna:** Construída com React e Vite, com um design minimalista e focado na experiência do utilizador.
- **API Robusta:** Backend construído com Node.js e Express, servindo como um intermediário seguro e eficiente entre o cliente e a API do Gemini.

---

### 🛠️ Arquitetura e Tecnologias Utilizadas

| Componente                     | Tecnologias                                         |
| :----------------------------- | :-------------------------------------------------- |
| **Frontend**                   | `React`, `Vite`, `Axios`, `CSS3`                    |
| **Backend**                    | `Node.js`, `Express.js`, `Google Generative AI SDK` |
| **Processamento de Ficheiros** | `Multer` (Uploads), `pdf-parse` (Leitura de PDF)    |
| **Integração de Média**        | `youtube-transcript`                                |
| **Ferramentas**                | `Git`, `GitHub`, `VS Code`, `Nodemon`               |

---

### 🚀 Como Executar o Projeto Localmente

Para executar a aplicação no seu ambiente de desenvolvimento, siga os passos abaixo.

#### 1. Clonar o Repositório

```bash
git clone [https://github.com/nisirtu/Sintese-IA.git](https://github.com/nisirtu/Sintese-IA.git)
cd Sintese-IA
```
