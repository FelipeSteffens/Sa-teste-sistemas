const { newDb } = require('pg-mem');
const fs = require('fs');
const path = require('path');

// create an in-memory Postgres instance
const db = newDb({ autoCreateForeignKeyIndexes: true });

// pg-mem provides a `public` schema and supports functions; create gen_random_uuid fallback
db.public.registerFunction({ name: 'gen_random_uuid', args: [], returns: 'text', implementation: () => require('uuid').v4() });

// Load schema SQL from db/create_tables.sql and normalize unsupported types for pg-mem
const schemaPath = path.join(__dirname, '..', '..', 'db', 'create_tables.sql');
let sql = fs.readFileSync(schemaPath, 'utf8');
// pg-mem has limited support for decimal precision; replace decimal(10, 2) with numeric
sql = sql.replace(/decimal\s*\(\s*\d+\s*,\s*\d+\s*\)/ig, 'numeric');
db.public.none(sql);

// create a Pool compatible with node-postgres using the adapter
const pg = db.adapters.createPg();
const Pool = pg.Pool;
const pool = new Pool();

module.exports = pool;
