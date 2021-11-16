import { NextApiRequest, NextApiResponse } from "next";
import { loadUser } from "../../../app/db-functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = <string>req.query.userId;

  switch (req.method) {
    case "GET":
      const user = await loadUser("user_id", userId);
      //   console.log(user);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).send("USER NOT FOUND");
      }
      break;

    default:
      res.status(501);
      break;
  }
}
