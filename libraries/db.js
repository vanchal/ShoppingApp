const knexObject = require("knex");
const pg = require("pg");
// const Pool = require('pg').Pool

pg.types.setTypeParser(20, Number);

const knexConfig = {
  client: "postgresql",
  connection: {
    database: "shopping",
    user: "tnluser",
    password: null,
  },

  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 2000, // free resources are destroyed after this many milliseconds
    reapIntervalMillis: 1000, // how frequent to check for idle resources to destroy
  },
};

// postgres://gradeup:@localhost:5432/training
const knex = knexObject(knexConfig);

module.exports = knex;

// const pool = new Pool({
//     user : 'tnluser',
//     host : 'localhost',
//     database : 'gradeup',
//     password : 'postgres',
//     port : '5432'
// });

// module.exports = pool;
