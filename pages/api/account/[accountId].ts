import { NextApiRequest, NextApiResponse } from "next";
import { getAccount, getUser } from "./db-functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const accountId = req.query.accountId.toString();
      const account = await getAccount(accountId);
      const user = await getUser(accountId);
      // console.log(accountId);

      if (account && user) {
        res.status(200).json({ ...account, ...user });
      } else {
        res.status(400).send("ACCOUNT NOT FOUND");
      }
      break;

    case "POST":
      const userId = req.query.accountId.toString();
      const info = req.body;

      console.log(userId);
      console.log(info);
      res.status(200).send("");
      break;

    default:
      res.status(501);
      break;
  }
}
