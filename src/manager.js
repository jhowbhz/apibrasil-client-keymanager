import axios from 'axios';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Corrige __dirname para ambientes ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Manager {
  /**
   * Registra uma mensagem de log no diretório /logs.
   * Cada log é salvo em um arquivo por data: log-YYYY-MM-DD.log
   *
   * @param {string} action - Nome da ação (ex: "error", "info").
   * @param {string} message - Mensagem a ser registrada.
   * @returns {Promise<Object>} - Status do log.
   */
  static async log(action, message) {
    try {
      const logDir = path.join(__dirname, '..', 'logs');
      fs.mkdirSync(logDir, { recursive: true });

      const date = moment().format('YYYY-MM-DD');
      const logEntry = `${date} ${action.toUpperCase()} ${message}\n`;

      const logPath = path.join(logDir, `log-${date}.log`);
      fs.appendFileSync(logPath, logEntry);

      console.log(`Log: ${action} salvo com sucesso!`, logEntry);
      return { log: 'save' };
    } catch (error) {
      console.error('Log: não foi salvo', error.message);
      return { log: 'error', message: error.message };
    }
  }

  /**
   * Realiza uma requisição POST para validar dados via URL externa.
   * Espera que a resposta tenha os campos: valid, error, details.
   *
   * @param {string} url - URL para requisição POST.
   * @param {Object} data - Corpo da requisição.
   * @returns {Promise<Object>} - Resultado da validação.
   */
  static async valid(url, data) {
    try {
      if (!url || !Manager.checkURL(url)) {
        throw new Error(`A URL fornecida (${url}) não é válida.`);
      }

      const response = await axios.post(url, data);
      const { valid, error, details } = response.data;

      return {
        valid,
        error,
        details,
        data: response.data,
      };
    } catch (error) {
      console.error('KeyManager: Erro ao validar sua chave de API', error.message);
      return {
        valid: false,
        error: error,
        details: error.message,
        data: {},
      };
    }
  }

  /**
   * Verifica se a string fornecida é uma URL válida.
   *
   * @param {string} url - String a ser verificada.
   * @returns {boolean} - true se válida, false caso contrário.
   */
  static checkURL(url) {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  }

  /**
   * Valida se os dados podem ser convertidos para JSON.
   *
   * @param {any} data - Dados a serem validados.
   * @returns {string|null} - JSON string ou null se inválido.
   */
  static checkDataJson(data) {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error('KeyManager: Erro ao validar os dados enviados', error.message);
      return null;
    }
  }
}

export default Manager;
