import mysql, { OkPacket, RowDataPacket } from "mysql2";
import Account from "../../models/Account";
import User from "../../models/User";

const pool = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "Robt",
  debug: false,
});

interface dbResult {
  success: boolean;
  error: boolean;
  data: any;
}

interface accountData {
  id: string;
  email: string;
  password: string;
  role: string;
  status: number;
}

interface userData {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const getAccountBy = (field: string, value: string) => {
  const accountQuery = mysql.format("SELECT * FROM Account WHERE ??=?", [
    field,
    value,
  ]);

  return new Promise<accountData | null>((resolve) => {
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
              id: rows[0].id,
              email: rows[0].email,
              password: rows[0].password,
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

export const getUserBy = (field: string, value: string) => {
  const userQuery = mysql.format("SELECT * FROM User WHERE ??=?", [
    field,
    value,
  ]);

  return new Promise<userData | null>((resolve) => {
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
              id: rows[0].id,
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

export const setUserNames = (
  firstName: string,
  lastName: string,
  accountId: string
) => {
  const updateUserNamesQuery = mysql.format(
    "UPDATE User SET first_name=?, last_name=? WHERE account_id=?",
    [firstName, lastName, accountId]
  );

  return new Promise<boolean>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(updateUserNamesQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          const dbResults = <OkPacket>results;
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
          // console.log(rows);

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
  const { id, accountId } = newUser;

  const newUserQuery = mysql.format(
    "INSERT INTO User (id, account_id) VALUES (?, ?)",
    [id, accountId]
  );

  return new Promise<boolean>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(newUserQuery, (error, results) => {
          if (error) throw new Error(error.message);
          con.release();

          const dbReponse = <OkPacket>results;
          if (dbReponse.affectedRows === 1) {
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

export const createNewAccount = async (newAccount: Account) => {
  const { id, email, password, role, status } = newAccount;

  const newAccountQuery = mysql.format(
    "INSERT INTO Account (id, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
    [id, email, password, role, status]
  );

  return new Promise<dbResult>(async (resolve) => {
    const accountExists = await alreadyExists("Account", "email", email);

    if (!accountExists) {
      //if account email doesn't exist
      try {
        pool.getConnection((error, con) => {
          if (error) throw new Error(error.message);

          //execute query
          con.query(newAccountQuery, (error, results) => {
            if (error) throw new Error(error.message);
            con.release();

            const dbResponse = <OkPacket>results;
            if (dbResponse.affectedRows === 1) {
              resolve({
                success: true,
                error: false,
                data: null,
              });
            }
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
        data: "ACCOUNT ALREADY EXISTS",
      });
    }
  });
};

export const updateAccountEmail = (accountId: string, newEmail: string) => {
  const updateEmailQuery = mysql.format(
    "UPDATE Account SET email=? WHERE id=?",
    [newEmail, accountId]
  );

  return new Promise((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(updateEmailQuery, (error, results) => {
          if (error) throw new Error(error.message);

          const dbResult = <OkPacket>results;
          if (dbResult.affectedRows === 1) {
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

export const updateUserPhone = (newPhoneNumber: string, accountId: string) => {
  const updatePhoneQuery = mysql.format(
    "UPDATE User SET phone_number=? WHERE account_id=?",
    [newPhoneNumber, accountId]
  );

  return new Promise<boolean>((resolve) => {
    try {
      pool.getConnection((error, con) => {
        if (error) throw new Error(error.message);

        con.query(updatePhoneQuery, (error, results) => {
          if (error) throw new Error(error.message);

          const dbResponse = <OkPacket>results;
          console.log(dbResponse);
          if (dbResponse.affectedRows === 1) {
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
