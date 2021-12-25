import { NextApiRequest, NextApiResponse } from "next";
import {
  getAccountBy,
  getUserBy,
  updateAccountEmail,
} from "../../../app/db-api";

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
      // console.log(account, user);

      if (account && user) {
        const accountInfo = {
          id: account.id,
          email: account.email,
          role: account.role,
          status: account.status,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        };

        res.status(200).json(accountInfo);
      } else {
        res.status(400).send("ACCOUNT NOT FOUND");
      }
      break;
    }
    case "PUT": {
      const { newEmail, password } = req.body;
      const account = await getAccountBy("id", accountId);

      if (account?.password === password) {
        const { success, error, data } = await updateAccountEmail(
          accountId,
          newEmail
        );

        if (success && !error) {
          res.status(200).json({ ok: true, info: null });
        } else if (!success && !error) {
          res.status(200).json({ ok: false, info: data });
        }
      } else {
        res.status(200).json({ ok: false, info: "INCORRECT PASSWORD" });
      }
      break;
    }
    default: {
      res.status(501);
    }
  }
}
