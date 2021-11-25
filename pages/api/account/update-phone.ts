import { NextApiRequest, NextApiResponse } from "next";
import { getAccountBy, updateUserPhone } from "../db-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { accountId, password, newPhoneNumber } = req.body;
    const account = await getAccountBy("id", accountId);
    // console.log(password, account?.password, accountId);

    if (account?.password === password) {
      const phoneUpdated = await updateUserPhone(newPhoneNumber, accountId);

      if (phoneUpdated) {
        res.status(200).json({ ok: true });
      } else {
        res.status(502).send("SOMETHING WENT WRONG");
      }
    } else {
      res.status(200).send({ ok: false, info: "INCORRECT PASSWORD" });
    }
  }
}
