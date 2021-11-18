import { NextApiRequest, NextApiResponse } from "next";
import { createNewAccount, createNewUser } from "./db-functions";
import { v4 as uuidv4 } from "uuid";

interface dbResult {
  success: boolean;
  error: boolean;
  data: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      //incoming account
      const receivedAccount = {
        ...req.body,
        id: uuidv4(),
        status: 1,
      };

      // console.log(receivedAccount);

      let accountResult: dbResult = await createNewAccount(receivedAccount);
      let userCreated = false;

      if (accountResult.success) {
        const user = {
          id: uuidv4(),
          account: receivedAccount.id,
        };
        userCreated = await createNewUser(user);
      }

      if (accountResult.success && !accountResult.error && userCreated) {
        const response = { id: receivedAccount.id, token: "123" };
        res.status(200).json(response);
      } else if (!accountResult.success && !accountResult.error) {
        res.status(406).send("UNAVAILABLE ACCOUNT");
      } else {
        res.status(502);
      }
      break;
    default:
      res.status(501);
      break;
  }
}
