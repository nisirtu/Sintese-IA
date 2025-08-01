// A PRIMEIRA LINHA DE TODAS!
// Carrega as variáveis de ambiente ANTES de qualquer outro código.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Agora sim, podemos importar nossas rotas, pois as variáveis de ambiente já existem.
const summaryRoutes = require('./src/api/summary.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Rota principal da API
app.use('/api', summaryRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});