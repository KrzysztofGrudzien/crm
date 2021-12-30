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

    createDatabase(obj) {
        this._data.push({
            id: uuid(),
            ...obj});
        writeFile(this.dbFileName, JSON.stringify(this._data), 'utf-8');
    }

    readDatabase(obj) {
        return this._data
    }

    updateDatabase(id, newObj) {
        this._data = this._data.map((obj) => (
            obj.id === id ? {...obj, ...newObj,} : obj
        ));
        writeFile(this.dbFileName, JSON.stringify(this._data), 'utf-8');
    }

    deleteDatabaseUser(id) {
        this._data = this._data.filter((obj) => (obj.id !== id))
        writeFile(this.dbFileName, JSON.stringify(this._data), 'utf-8');
    }
}

const database = new Database('client.json');

module.exports = {
    database,
}
