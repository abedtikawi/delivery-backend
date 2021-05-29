const Pool = require("pg").Pool;

const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DATABASE,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

try {
  console.log("[+] Trying to connect to AWS RDS ..");
  pool.connect((err, res) => {
    if (err) {
      console.log("[-] Connection to AWS Failed");
      return console.log(err);
    }
    console.log("[+] Successfully Connected to AWS");
  });
} catch (err) {
  console.log("Connection Error", err);
  console.dir(err, { depth: 4 });
  process.exit(1);
}

module.exports = pool;
