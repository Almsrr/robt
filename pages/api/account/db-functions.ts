import mysql, { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import Account from "../../../models/Account";
import User from "../../../models/User";

const pool = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "Robt",
  debug: false,
});

interface accountInfo {
  accountId: string;
  email: string;
  role: string;
  status: number;
}

interface userInfo {
  userId: string;
  firstName: string;
  lastName: string;
}

export const getAccount = (accountId: string) => {
  const accountQuery = mysql.format(
    "SELECT account_id, email, role, status FROM Account WHERE account_id=?",
    [accountId]
  );

  return new Promise<accountInfo | null>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(accountQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          const rows = <RowDataPacket[]>results;
          // console.log(rows);

          if (rows.length > 0) {
            const account = {
              accountId: rows[0].account_id,
              email: rows[0].email,
              role: rows[0].role,
              status: rows[0].status,
            };
            resolve(account);
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

export const getUser = (accountId: string) => {
  const userQuery = mysql.format(
    "SELECT user_id, first_name, last_name, phone_number FROM User WHERE account=?",
    [accountId]
  );

  return new Promise<userInfo | null>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(userQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          const rows = <RowDataPacket[]>results;
          // console.log(rows);

          if (rows.length > 0) {
            const user = {
              userId: rows[0].user_id,
              firstName: rows[0].first_name,
              lastName: rows[0].last_name,
              phoneNumber: rows[0].phone_number,
            };
            resolve(user);
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

export const updateUserFirstAndLastName = (
  firstName: string,
  lastName: string,
  accountId: string
) => {
  const updateUserQuery = mysql.format(
    "UPDATE User SET first_name=?, last_name=? WHERE account=?",
    [firstName, lastName, accountId]
  );

  return new Promise<boolean>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(updateUserQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          const dbResults = <OkPacket>results;
          // console.log(dbResults);

          if (dbResults.affectedRows > 0) {
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

export const alreadyExists = (table: string, field: string, value: string) => {
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
          con.release();

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

export const createNewUser = async (newUser: User) => {
  const { id, account } = newUser;

  const userQuery = mysql.format(
    "INSERT INTO User (user_id, account) VALUES (?, ?)",
    [id, account]
  );

  return new Promise<boolean>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        //execute query
        con.query(userQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          resolve(true);
        });
      });
    } catch (error: any) {
      console.log(error.message);
      resolve(false);
    }
  });
};

export const createNewAccount = async (newAccount: Account) => {
  const { id, email, password, role, status } = newAccount;

  const accountQuery = mysql.format(
    "INSERT INTO Account (account_id, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
    [id, email, password, role, status]
  );

  return new Promise<{ success: boolean; error: boolean; data: any }>(
    async (resolve) => {
      const accountExists = await alreadyExists("Account", "email", email);

      if (!accountExists) {
        //if account email doesn't exist
        try {
          pool.getConnection((error, con) => {
            if (error) throw new Error(error.message);

            //execute query
            con.query(accountQuery, (error, results) => {
              if (error) throw new Error(error.message);
              con.release();

              // console.log(results);
              resolve({
                success: true,
                error: false,
                data: null,
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

export const getAccountPassword = (field: string, value: string) => {
  const selectQuery = mysql.format("SELECT password FROM Account WHERE ??=?", [
    field,
    value,
  ]);
  return new Promise<string>(async (resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(selectQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          const rows = <RowDataPacket[]>results;

          if (rows.length > 0) {
            const accountPassword = rows[0].password;
            resolve(accountPassword);
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

export const getAccountId = (field: string, value: string) => {
  const selectQuery = mysql.format(
    "SELECT account_id FROM Account WHERE ??=?",
    [field, value]
  );
  return new Promise<string>(async (resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(selectQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          const rows = <RowDataPacket[]>results;

          if (rows.length > 0) {
            const accountId = rows[0].account_id;
            resolve(accountId);
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
