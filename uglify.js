// uglify.js

const fs = require('fs');
const { minify } = require('uglify-js');

// Arquivo de entrada e saída
const inputFile = 'src/manager.js';
const outputFile = 'build/manager.js';

// Leitura do arquivo original
const code = fs.readFileSync(inputFile, 'utf8');

// Opções de minificação
const options = {
  // Configurações de minificação aqui, se necessário
};

// Minificar o código
const minifiedCode = minify(code, options);

// Salvar o código minificado
fs.writeFileSync(outputFile, minifiedCode.code, 'utf8');

console.log(`Arquivo ${outputFile} gerado com sucesso!`);