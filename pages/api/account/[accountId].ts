import { NextApiRequest, NextApiResponse } from "next";
import {
  getAccountBy,
  getUserBy,
  setUserNames,
  updateAccountEmail,
} from "./db-functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Global variable
  const accountId = req.query.accountId.toString();

  switch (req.method) {
    case "GET": {
      const account = await getAccountBy("id", accountId);
      const user = await getUserBy("account_id", accountId);
      console.log(account, user);

      let accountInfo = {};
      if (account && user) {
        for (const key in account) {
          if (key === "password") continue;
          accountInfo = { ...accountInfo, key };
        }

        res.status(200).json({ ...account, ...user });
      } else {
        res.status(400).send("ACCOUNT NOT FOUND");
      }
      break;
    }
    case "POST": {
      const { firstName, lastName } = req.body;
      // console.log(firstName, lastName);

      const namesUpdated = await setUserNames(firstName, lastName, accountId);

      if (namesUpdated) {
        res.status(200).send("NAMES UPDATED SUCCESSFULLY");
      } else {
        res.status(502).send("");
      }
      break;
    }
    case "PUT": {
      const { newEmail, password } = req.body;
      const account = await getAccountBy("id", accountId);

      if (account?.password === password) {
        await updateAccountEmail(accountId, newEmail);
        res.status(200).send("EMAIL UPDATED SUCCESSFULLY");
      } else {
        res.status(406).send("INCORRECT PASSWORD");
      }
      break;
    }
    default: {
      res.status(501);
    }
  }
}
