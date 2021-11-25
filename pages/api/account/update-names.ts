import { NextApiRequest, NextApiResponse } from "next";
import { getAccountBy, setUserNames } from "../db-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { firstName, lastName, accountId } = req.body;
    // console.log(firstName, lastName);

    const namesUpdated = await setUserNames(firstName, lastName, accountId);

    if (namesUpdated) {
      res.status(200).json({ success: true });
    } else {
      res.status(502).send("");
    }
  }
}
