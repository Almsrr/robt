import { NextApiRequest, NextApiResponse } from "next";
import { createNewAccount, createNewUser } from "../../../app/db-api";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      const { email, password, role } = req.body;

      const newAccount = {
        id: uuidv4(),
        email,
        password,
        role,
        status: 1,
      };
      // console.log(newAccount);

      const accountCreation = await createNewAccount(newAccount);
      let userWasCreated = false;

      if (accountCreation.success) {
        const newUser = {
          id: uuidv4(),
          accountId: newAccount.id,
        };
        userWasCreated = await createNewUser(newUser);
      }

      if (accountCreation.success && !accountCreation.error && userWasCreated) {
        const response = { id: newAccount.id, token: "123", ok: true };
        res.status(200).json(response);
      } else if (!accountCreation.success && !accountCreation.error) {
        res.status(200).json({ ok: false, info: accountCreation.data });
      } else {
        res.status(502);
      }
      break;
    }
    default:
      res.status(501);
  }
}
