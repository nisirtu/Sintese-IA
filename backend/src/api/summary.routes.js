const express = require('express');

const router = express.Router();

const multer = require('multer');

const summaryController = require('./summary.controller');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/summarize', summaryController.handleSummarize);

router.post(
  '/summarize-pdf',
  upload.single('pdfFile'), 
  summaryController.handleSummarizePdf // Nossa nova função de lógica
);

module.exports = router;

router.post('/summarize-video', summaryController.handleSummarizeVideo);

module.exports = router;