import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORTDB,
});

pool.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);
    return;
  }
  console.log("Connected to the database successfully!");

  // Test simple query
  connection.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      console.error("Error executing test query:", err.message);
    } else {
      console.log("Test query result:", results[0].solution); // Should print "2"
    }
    connection.release(); // Release the connection
  });
});

export default pool;
