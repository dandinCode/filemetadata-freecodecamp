var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Importando o multer
require('dotenv').config();

var app = express();

// Configuração do multer para o diretório temporário
var storage = multer.memoryStorage(); // Armazenando arquivos na memória (para não salvar no servidor)
var upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Rota POST para análise de arquivo
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Enviando os dados do arquivo como resposta JSON
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  res.json(fileInfo); // Retornando JSON com os detalhes do arquivo
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
