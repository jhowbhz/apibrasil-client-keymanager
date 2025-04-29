const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

class KeyManager {

  static LOG_DIR = __dirname + "/logs";
    
  static async log(level, message) {

    try {
      
      const logDate = moment().format("YYYY-MM-DD");
      const logLine = `${logDate} ${level.toUpperCase()} ${message}\n`;

      if (!fs.existsSync(this.LOG_DIR)) {
        fs.mkdirSync(this.LOG_DIR);
      }

      const logFilePath = `${this.LOG_DIR}/log-${logDate}.log`;
      fs.appendFileSync(logFilePath, logLine);

      console.log("KeyManager: Log salvo com sucesso", logLine);
      return { log: "save" };

    } catch (error) {
      
      console.error("KeyManager: Erro ao salvar o log", error.message);
      return { log: "error" };
    
    }
  
  }

  /**
   * Valida uma chave de API usando a URL informada
   * @param {object} apiKeyPayload Dados da requisição
   * @param {string} url URL do endpoint de validação
   */
  static async validate(apiKeyPayload, url = "") {
    try {

      const response = await axios.post(url, apiKeyPayload);
      const { valid, details, expired_at } = response.data;

      //if url ""
      if (url === "") {
        return {
          valid: false,
          expired_at: "00/00/0000",
          details: "URL não informada",
          data: {},
        }
      }
      
      return {
        valid,
        expired_at: moment(expired_at).toISOString(),
        details,
        data: response.data,
      };

    } catch (error) {
      return {
        valid: false,
        expired_at: "00/00/0000",
        details: error.message,
        data: {},
      };
    }
  }

  static checkDataJson(data) {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error("KeyManager: Erro ao validar os dados enviados", error.message);
      return null;
    }
  }
}

module.exports = KeyManager;
