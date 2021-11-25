import { NextApiRequest, NextApiResponse } from "next";
import { getAccountBy, updateUserPhone } from "../db-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { newPhoneNumber, password, accountId } = req.body;
    const account = await getAccountBy("id", accountId);
    console.log(password, account?.password, accountId);

    if (account?.password === password) {
      const phoneUpdated = await updateUserPhone(newPhoneNumber, accountId);

      if (phoneUpdated) {
        res.status(200).json({ success: true });
      } else {
        res.status(502).send("");
      }
    } else {
      res.status(406).send("INCORRECT PASSWORD");
    }
  }
}
