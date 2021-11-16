import { NextApiRequest, NextApiResponse } from "next";
import { createNewUser, loadUser } from "../../../app/db-functions";
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
  const newUser = {
    ...req.body,
    id: uuidv4(),
  };

  switch (req.method) {
    case "POST":
      const result: dbResult = await createNewUser(newUser);

      if (result.success && !result.error) {
        const response = { id: result.data, token: "123" };
        res.status(200).json(response);
      } else if (!result.success && !result.error) {
        res.status(406).send("USER ALREADY EXIST");
      } else {
        res.status(502);
      }

      break;
    default:
      res.status(501);
      break;
  }
}
