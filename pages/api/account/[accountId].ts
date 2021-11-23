import { NextApiRequest, NextApiResponse } from "next";
import {
  getAccount,
  getUser,
  updateUserFirstAndLastName,
} from "./db-functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Global scope variable
  const accountId = req.query.accountId.toString();

  switch (req.method) {
    case "GET":
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
      const { firstName, lastName } = req.body;
      // console.log(firstName, lastName, accountId);

      const updateSuccessfully = await updateUserFirstAndLastName(
        firstName,
        lastName,
        accountId
      );

      if (updateSuccessfully) {
        res.status(200).send("");
      } else {
        res.status(502).send("");
      }
      break;

    default:
      res.status(501);
      break;
  }
}
