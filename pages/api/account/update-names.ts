import { NextApiRequest, NextApiResponse } from "next";
import { getAccountBy, setUserNames } from "../../../app/db-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { firstName, lastName, accountId } = req.body;
    console.log(firstName, lastName, accountId);

    const namesUpdated = await setUserNames(firstName, lastName, accountId);

    if (namesUpdated) {
      res.status(200).json({ ok: true });
    } else {
      res.status(200).send({ ok: false, info: "TRY AGAIN" });
    }
  }
}
