import mysql from "mysql2";

const pool = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "Robt",
  debug: false,
});

const loadUserFromDb = (username: string) => {
  const query = mysql.format(
    "SELECT id, first_name, last_name, username, email  FROM ?? WHERE ??=?",
    ["Candidate", "username", username]
  );

  return new Promise((resolve, reject) => {
    try {
      pool.getConnection((error: any, con: any) => {
        if (error) throw new Error(error.message);

        con.query(query, (error: any, results: any) => {
          if (error) throw new Error(error.message);

          // console.log(results);
          resolve({
            id: results[0].id,
            firstName: results[0].first_name,
            lastName: results[0].last_name,
            username: results[0].username,
            email: results[0].email,
          });
        });
      });
    } catch (error: any) {
      console.log(error.message);
    }
  });
};

export { loadUserFromDb };
