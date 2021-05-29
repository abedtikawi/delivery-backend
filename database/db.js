const Pool = require("pg").Pool;
const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  database:process.env.RDS_DATABASE,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

console.log("[+] Trying to connect to AWS RDS ..");
pool.connect((err, res) => {
  if (err) {
    console.log("[-] Connection to AWS Failed");
    console.log(err)
    return err;
  }
  const sql = `SELECT * FROM users ORDER BY user_id ASC`;
  pool.query(sql, (error, results) => {
    console.log("[+] Successfully Connected to AWS");
  });
});
