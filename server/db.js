// const assert = require("assert");
// const client = require("mongodb").MongoClient;
// // const config = require("../config");
// let _db;

// function initDb(callback) {
//     if (_db) {
//         console.warn("Trying to init DB again!");
//         return callback(null, _db);
//     }
//     client.connect("mongodb://localhost:27017", connected);
//     function connected(err, client) {
//         if (err) {
//             return callback(err);
//         }
//         console.log("DB initialized - connected to: ");
//         _db = client.db('xreactive');
//         return callback(null, _db);
//     }
// }
// function getDb() {
//     assert.ok(_db, "Db has not been initialized. Please called init first.");
//     return _db;
// } 

// module.exports = {
//     getDb,
//     initDb
// };


// let mongoose = require('mongoose');
// const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
// const database = 'passport-tutorial';      // REPLACE WITH YOUR DB NAME
// class Database {
//     constructor() {
//         this._connect()
//     }
//     _connect() {
//         mongoose.connect(`mongodb://${server}/${database}`)
//             .then(() => {
//                 console.log('Database connection successful')
//             })
//             .catch(err => {
//                 console.error('Database connection error')
//             })
//     }
// }
// module.exports = new Database()