const mongoose = require('mongoose');
const dbsConfig = require("../config").dbs;
const logger = require("./logger.service")(module);

/**
 * Базовый класс сервиса работы с базой данных
 */
class Database {
  #uri;
  #id;
  #database;
  #connection;

  constructor(config) {
    this.#uri = config.uri;
    this.#id = config.id;
    this.#database = config.database;
  }

  /**
   * Открывает соединение с БД.
   * @return {Promise<void>}
   */
  async connect() {
    try {
      this.#connection = await mongoose.createConnection(this.#uri, {
        dbName: this.#database,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info(`Connected to ${this.#id}`);
    } catch (error) {
      logger.error(`Unable to connect to ${this.#id}:`, error.message);
      throw error;
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    if (this.#connection) {
      try {
        await this.#connection.close();
        logger.info(`Disconnected from ${this.#id}`);
      } catch (error) {
        logger.error(`Unable to disconnect from ${this.#id}:`, error.message);
        throw error;
      }
    }
  }

  /**
   * Возвращает объект соединения с БД,
   * @return {Object}
   */
  get connection() {
    return this.#connection;
  }
}

const sampleDB = new Database(dbsConfig.sample_db);

module.exports = { sampleDB };