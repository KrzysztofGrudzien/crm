const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');

class Database {
    constructor(dbFileName) {
        this.dbFileName = join(__dirname, '../data', dbFileName);
        this._loadDatabase();
    }

    async _loadDatabase() {
        this._data = JSON.parse(await readFile(this.dbFileName, 'utf-8'))
    }

    async createDatabase(obj) {
        this._data.push({
            id: uuid(),
            ...obj});
        await writeFile(this.dbFileName, JSON.stringify(this._data), 'utf-8');
    }

    readDatabase(obj) {
        return this._data
    }
}

const database = new Database('client.json');

module.exports = {
    database,
}
