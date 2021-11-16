import mysql, { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import User from "../../../models/User";

const pool = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "Robt",
  debug: false,
});

const serverToken = "123";

interface userData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

const loadUser = (field: string, value: string) => {
  const query = mysql.format("SELECT * FROM User WHERE ??=?", [field, value]);

  return new Promise<userData | null>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(query, (error, results) => {
          if (error) throw new Error(error.message);

          const rows = <RowDataPacket[]>results;
          // console.log(rows);

          if (rows.length > 0) {
            resolve({
              id: rows[0].user_id,
              firstName: rows[0].first_name,
              lastName: rows[0].last_name,
              role: rows[0].role,
              email: rows[0].email,
              // password: rows[0].password,
            });
          } else {
            resolve(null);
          }
        });
      });
    } catch (error: any) {
      console.log(error.message);
      resolve(null);
    }
  });
};

const userAlreadyExist = (table: string, field: string, value: string) => {
  const selectQuery = mysql.format("SELECT * FROM ?? WHERE ??=?", [
    table,
    field,
    value,
  ]);

  return new Promise<boolean>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);
        con.query(selectQuery, (error, results) => {
          if (error) throw new Error(error.message);

          //cast to an array
          const rows = <RowDataPacket[]>results;

          if (rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    } catch (error: any) {
      console.log(error.message);
      resolve(false);
    }
  });
};

const createNewUser = async (newUser: User) => {
  const { id, firstName, lastName, role, email, password } = newUser;

  const insertQuery = mysql.format(
    "INSERT INTO User (user_id, first_name, last_name, role, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [id, firstName, lastName, role, email, password]
  );

  return new Promise<{ success: boolean; error: boolean; data: any }>(
    async (resolve) => {
      const userExists = await userAlreadyExist("User", "email", email);

      if (!userExists) {
        try {
          pool.getConnection((error, con) => {
            if (error) throw new Error(error.message);

            con.query(insertQuery, (error, results) => {
              if (error) throw new Error(error.message);

              // console.log(results);
              resolve({
                success: true,
                error: false,
                data: id,
              });
            });
          });
        } catch (error: any) {
          resolve({
            success: false,
            error: true,
            data: null,
          });
        }
      } else {
        resolve({
          success: false,
          error: false,
          data: null,
        });
      }
    }
  );
};

const getUserPassword = (field: string, value: string) => {
  const selectQuery = mysql.format("SELECT password FROM User WHERE ??=?", [
    field,
    value,
  ]);
  return new Promise<string>(async (resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(selectQuery, (error, results) => {
          if (error) throw new Error(error.message);

          const rows = <RowDataPacket[]>results;

          if (rows.length > 0) {
            const userPassword = rows[0].password;
            resolve(userPassword);
          } else {
            resolve("");
          }
        });
      });
    } catch (error: any) {
      console.log(error.message);
      resolve("");
    }
  });
};

const getUserId = (field: string, value: string) => {
  const selectQuery = mysql.format("SELECT user_id FROM User WHERE ??=?", [
    field,
    value,
  ]);
  return new Promise<string>(async (resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(selectQuery, (error, results) => {
          if (error) throw new Error(error.message);

          const rows = <RowDataPacket[]>results;

          if (rows.length > 0) {
            const userId = rows[0].user_id;
            resolve(userId);
          } else {
            resolve("");
          }
        });
      });
    } catch (error: any) {
      console.log(error.message);
      resolve("");
    }
  });
};

export { loadUser, createNewUser, getUserPassword, getUserId };
