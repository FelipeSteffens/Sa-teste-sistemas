const { newDb } = require('pg-mem');
const fs = require('fs');
const path = require('path');


const db = newDb({ autoCreateForeignKeyIndexes: true });


db.public.registerFunction({ name: 'gen_random_uuid', args: [], returns: 'text', implementation: () => require('uuid').v4() });


const schemaPath = path.join(__dirname, '..', '..', 'db', 'create_tables.sql');
let sql = fs.readFileSync(schemaPath, 'utf8');

sql = sql.replace(/decimal\s*\(\s*\d+\s*,\s*\d+\s*\)/ig, 'numeric');
db.public.none(sql);


const pg = db.adapters.createPg();
const Pool = pg.Pool;
const pool = new Pool();

module.exports = pool;
