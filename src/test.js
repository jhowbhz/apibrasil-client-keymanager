import Manager from './manager.js';

async function runTests() {
  console.log('\n========= TESTE: checkURL =========');
  const urlValida = 'https://example.com';
  const urlInvalida = 'invalid-url';
  console.log(`URL válida (${urlValida}):`, Manager.checkURL(urlValida)); // true
  console.log(`URL inválida (${urlInvalida}):`, Manager.checkURL(urlInvalida)); // false

  console.log('\n========= TESTE: checkDataJson =========');
  const objValido = { key: 'value' };
  const objCircular = {};
  objCircular.ref = objCircular;
  console.log('Objeto válido:', Manager.checkDataJson(objValido)); // JSON string
  console.log('Objeto circular:', Manager.checkDataJson(objCircular)); // null

  console.log('\n========= TESTE: log =========');
  const logResult = await Manager.log('info', 'Mensagem de teste para o sistema de log');
  console.log('Resultado do log:', logResult);

  console.log('\n========= TESTE: valid =========');
  const testUrl = 'https://httpbin.org/post'; // simula apenas
  const testData = { chave: '1234' };

  try {
    const result = await Manager.valid(testUrl, testData);

    if ('valid' in result) {
      console.log('Valid:', result.valid ?? 'N/A');
      console.log('Error:', result.error ?? 'N/A');
      console.log('Details:', result.details ?? 'N/A');
    } else {
      console.warn('⚠️ A resposta não possui os campos esperados:', result);
    }
  } catch (err) {
    console.error('Erro ao testar método valid:', err.message);
  }

  console.log('\n========= FIM DOS TESTES =========\n');
}

runTests().catch(error => {
  console.error('Erro geral durante os testes:', error);
});
