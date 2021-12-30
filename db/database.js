const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');

class Database {
    constructor(dbFileName) {
        this.dbFileName = join(__dirname, '../data', dbFileName);
        this._loadDB();
    }

    async _loadDB() {
        this._data = JSON.parse(await readFile(this.dbFileName, 'utf-8'))
    }

    _saveDB() {
        writeFile(this.dbFileName, JSON.stringify(this._data), 'utf-8');
    }

    createDB(obj) {
        this._data.push({
            id: uuid(),
            ...obj});
        this._saveDB();
    }

    readAllClients(obj) {
        return this._data
    }

    readOneClient(id) {
        return this._data.find(obj => obj.id === id)
    }

    updateDB(id, newObj) {
        this._data = this._data.map((obj) => (
            obj.id === id ? {...obj, ...newObj,} : obj
        ));
        this._saveDB();
    }

    deleteOneClient(id) {
        this._data = this._data.filter((obj) => (obj.id !== id))
        this._saveDB();
    }
}

const clientsDB = new Database('client.json');

module.exports = {
    clientsDB,
}
